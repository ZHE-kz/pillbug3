export interface Question {
    globalIndex: number;
    chapter: number;
    qnum: number;
    question: string;
    options: string[];
    answer: number;
    story: string;
}
export async function getQuestions(): Promise<Question[]> {
    return [
        { globalIndex: 0, chapter: 1, qnum: 1, question: '鼠婦最喜歡的生活環境是？', options: ['乾燥','潮濕'], answer:1, story:'滾滾喜歡枯葉堆...' },
        { globalIndex: 1, chapter: 1, qnum: 2, question: '鼠婦吃什麼？', options: ['鮮肉','腐葉'], answer:1, story:'鼠婦是腐食性分解者...' }
    ];
}
