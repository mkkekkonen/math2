import JXG from 'jsxgraph';

const commonOptions = {
  fixed: true,
  withLabel: false,
};

const endPointOptions = {
  ...commonOptions,
  size: 2,
};

class SlideMeasure {
  segment: JXG.Segment;
  linePoint1: JXG.Point;
  linePoint2: JXG.Point;
  point: JXG.Point;

  static create = (
    board: JXG.Board,
    linePoints: number[],
    startPoint: number[],
    options: any = {}
  ) => {
    const measure = new SlideMeasure();

    const [x1, y1, x2, y2] = linePoints;

    measure.linePoint1 = board.create('point', [x1, y1], {
      ...options,
      ...endPointOptions,
    });
    measure.linePoint2 = board.create('point', [x2, y2], {
      ...options,
      ...endPointOptions,
    });

    measure.segment = board.create(
      'segment',
      [measure.linePoint1, measure.linePoint2],
      { ...options, ...commonOptions }
    );
    measure.point = board.create('point', startPoint, {
      ...options,
      ...commonOptions,
      size: 5,
      face: 'o',
    });

    return measure;
  };

  update = (newPoint: number[]) => {
    this.point.moveTo(newPoint);
  };
}

export default SlideMeasure;
