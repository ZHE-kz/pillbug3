export interface Player {
    userId: string;
    qIndex: number;
    score: number;
}
const players = new Map<string, Player>();
export function getPlayer(userId: string): Player {
    if (!players.has(userId)) {
        players.set(userId, { userId, qIndex: 0, score: 0 });
    }
    return players.get(userId)!;
}
export function savePlayer(player: Player) {
    players.set(player.userId, player);
}
