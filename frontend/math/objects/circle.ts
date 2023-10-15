import JXG from 'jsxgraph';

const pointOptions = {
  face: 'o',
  size: 2,
  color: '#555',
  fixed: true,
};

class Circle {
  point1: JXG.Point;
  point2: JXG.Point;
  circle: JXG.Circle;

  static create = (board: JXG.Board, points: number[]) => {
    const [x1, y1, x2, y2] = points;

    const circle = new Circle();
    circle.point1 = board.create('point', [x1, y1], pointOptions);
    circle.point2 = board.create('point', [x2, y2], pointOptions);

    circle.circle = board.create('circle', [circle.point1, circle.point2], {
      strokeColor: '#555',
      strokeWidth: 1,
      fixed: true,
    });

    return circle;
  };
}

export default Circle;
