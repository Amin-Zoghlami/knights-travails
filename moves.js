export default function knightMoves(start, end) {
  if (!Array.isArray(start) || !Array.isArray(end)) {
    throw new Error("Start and end must be an array");
  }

  if (
    start[0] < 0 ||
    start[0] > 7 ||
    start[1] < 0 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[0] > 7 ||
    end[1] < 0 ||
    end[1] > 7
  ) {
    throw new Error(
      "Start and end coordinates must be between 0 - 7 inclusive"
    );
  }

  const queue = [start];
  const map = new Map();
  const visited = new Set();
  visited.add(start.toString());

  const moves = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  while (queue.length !== 0) {
    const [x, y] = queue.shift();

    if (x === end[0] && y === end[1]) break;

    for (const [dx, dy] of moves) {
      const newX = x + dx;
      const newY = y + dy;
      const newCoordinate = `${newX},${newY}`;
      if (
        visited.has(newCoordinate) ||
        newX < 0 ||
        newX > 7 ||
        newY < 0 ||
        newY > 7
      ) {
        continue;
      }

      queue.push([newX, newY]);
      map.set(newCoordinate, `${x},${y}`);
      visited.add(newCoordinate);
    }
  }

  const path = [];
  let coordinate = `${end[0]},${end[1]}`;

  while (coordinate !== `${start[0]},${start[1]}`) {
    const [currentX, currentY] = coordinate.split(",").map(Number);
    path.push([currentX, currentY]);
    coordinate = map.get(coordinate);
  }

  path.push([start[0], start[1]]);

  console.log(`You made it in ${path.length - 1} move(s)! Here's your path:`);

  for (let i = path.length - 1; i >= 0; i--) {
    console.log(path[i]);
  }
}
