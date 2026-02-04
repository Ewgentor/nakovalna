export function computeActions(min: number, max: number): string[] {
  console.log(`Computing actions for range: ${min} to ${max}`);
  const actions: string[] = [];
  const range = max - min;
  const steps = [-3, -6, -9,-15, 3, 7, 13, 16];

  // Реализуем поиск в ширину
  let visited: Map<number, { dist: number; prev: number | null; step_used: number | null }> = new Map();
  let queue: number[] = [0];

  visited.set(0, { dist: 0, prev: null, step_used: null });

  while (queue.length > 0) {
    const current = queue.shift() as number;
    const curr_dist = visited.get(current)!.dist;
    if (current === range) {
       break;}
    
    for (let step of steps) {
        const next = current + step;
        if (next < 0 || next > range) {
            continue;
        }
        if (!visited.has(next)) {
            visited.set(next, { dist: curr_dist + 1, prev: current, step_used: step });
            queue.push(next);
        }
    }
    if (visited.has(range)) {
        break;
    }
  }
    // Восстанавливаем путь
    if (!visited.has(range)) {
        return ["No solution"];
    }
    let path: number[] = [];
    let step = range;
    while (step !== 0) {
        const info = visited.get(step)!;
        path.push(info.step_used as number);
        step = info.prev as number;
    }
    path.reverse();

    for (let s of path) {
        switch (s) {
            case -3:
                actions.push('-3');
                break
            case -6:
                actions.push('-6');
                break;
            case -9:
                actions.push('-9'); 
                break;
            case -15:
                actions.push('-15');
                break;
            case 3:
                actions.push('3');
                break;
            case 7:
                actions.push('7');
                break;
            case 13:
                actions.push('13');
                break;
            case 16:
                actions.push('16');
                break;
        }
    }
  return actions;
}