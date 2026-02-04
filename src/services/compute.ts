export function computeActions(min: number, max: number): string[] {
  console.log(`Computing actions for range: ${min} to ${max}`);
  const actions: string[] = [];
  const range = max - min;
  const steps = [-3, -6, -9,-15, 2, 7, 13, 16];

  if (range === 0) return actions;
  
  const queue = [{position: 0, path: [] as string[]}];
  const visited = new Set([0]);

  while (queue.length > 0) {
    const { position, path } = queue.shift()!;
    for (const step of steps) {
        const newPos = position + step;
        const newPath = [...path, String(step)];
        if (newPos === range) {
            newPath.sort((a, b) => (Number(b)) - (Number(a)));
            return newPath;
        }
        if (!visited.has(newPos)) {
            visited.add(newPos);
            queue.push({
                position: newPos,
                path: newPath,
            })}
        }
    }
    return actions;
}