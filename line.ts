import { Player, getPlayer, savePlayer } from './db.ts';

export const LINE_TOKEN = Deno.env.get('LINE_TOKEN') || '';

export function buildQuestionFlex(q: any) {
    return {
        type: 'flex',
        altText: Q\. \,
        contents: {
            type: 'bubble',
            header: {
                type: 'box',
                layout: 'vertical',
                contents: [{ type:'text', text:🐾 第\章, weight:'bold', size:'lg'}]
            },
            hero: { type:'image', url:'https://i.imgur.com/0KFBHTB.png', size:'full', aspectMode:'cover' },
            body: {
                type:'box',
                layout:'vertical',
                spacing:'md',
                contents: [
                    { type:'text', text: q.story },
                    { type:'text', text: ❓ \, wrap:true }
                ]
            },
            footer: {
                type:'box',
                layout:'vertical',
                spacing:'sm',
                contents: q.options.map((opt:any,i:number)=>({
                    type:'button',
                    action:{ type:'postback', label:String.fromCharCode(65+i)+'. '+opt, data:nswer:\:\ }
                }))
            }
        }
    };
}

export async function pushToUser(userId: string, messages: any) {
    const payload = { to: userId, messages: Array.isArray(messages)?messages:[messages] };
    await fetch('https://api.line.me/v2/bot/message/push', {
        method:'POST',
        headers:{ Authorization: Bearer \, 'Content-Type':'application/json' },
        body: JSON.stringify(payload)
    });
}
