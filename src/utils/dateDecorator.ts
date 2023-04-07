export function shortDate(date: number) {
    return (new Date(date)).toISOString().slice(0, 10);
}
