import { serve } from './deps.ts';
import { getQuestions } from './sheets.ts';
import { getPlayer, savePlayer } from './db.ts';
import { buildQuestionFlex, pushToUser } from './line.ts';

const questions = await getQuestions();

console.log('Listening on http://localhost:8000/');
serve(async (req) => {
    if(req.method==='POST') {
        const body = await req.json();
        const events = body.events || [];
        for(const ev of events) {
            const userId = ev.source?.userId || '';
            if(!userId) continue;

            if(ev.type==='message' && ev.message?.type==='text') {
                const player = getPlayer(userId);
                const q = questions[player.qIndex];
                const flex = buildQuestionFlex(q);
                await pushToUser(userId, flex);
            }

            if(ev.type==='postback') {
                const data = ev.postback?.data || '';
                const [cmd,gIndexStr,optStr] = data.split(':');
                if(cmd==='answer') {
                    const gIndex = Number(gIndexStr);
                    const optIndex = Number(optStr);
                    const q = questions[gIndex];
                    const player = getPlayer(userId);
                    if(optIndex===q.answer) player.score+=10;
                    player.qIndex = gIndex+1;
                    savePlayer(player);
                    const flex = buildQuestionFlex(questions[player.qIndex] || q);
                    await pushToUser(userId,[{ type:'text', text:你目前分數: \ }, flex]);
                }
            }
        }
        return new Response('OK');
    }
    return new Response('Hello LINE Bot!');
});
