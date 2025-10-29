import * as constants from 'math2/constants';

const defaultColor = constants.COLORS.BLUE;

const defaultLineSegmentOptions: JXG.SegmentAttributes = {
  fixed: true,
  color: defaultColor,
};

const defaultEndPointOptions: JXG.PointAttributes = {
  fixed: true,
  withLabel: false,
  color: defaultColor,
  size: 3,
};

const defaultPointOptions: JXG.PointAttributes = {
  fixed: true,
  withLabel: false,
  color: defaultColor,
  size: 4,
};

export default class SlideMeasure {
  private segment: JXG.Segment;
  private endPoint1: JXG.Point;
  private endPoint2: JXG.Point;
  private point: JXG.Point;

  constructor(
    segment: JXG.Segment,
    endPoint1: JXG.Point,
    endPoint2: JXG.Point,
    point: JXG.Point
  ) {
    this.segment = segment;
    this.endPoint1 = endPoint1;
    this.endPoint2 = endPoint2;
    this.point = point;
  }

  updateValue = (point: number[]) => {
    this.point.moveTo(point);
  };

  get pointCoordinates() {
    return {
      x: this.point.X(),
      y: this.point.Y(),
    };
  }

  static initialize = (
    board: JXG.Board,
    lineCoordinates: number[],
    pointCoordinates: number[],
    segmentOptions = defaultLineSegmentOptions,
    pointOptions = defaultPointOptions,
    endPointOptions = defaultEndPointOptions
  ) => {
    const [x1, y1, x2, y2] = lineCoordinates;
    const segmentEndPoint1 = board.create('point', [x1, y1], endPointOptions);
    const segmentEndPoint2 = board.create('point', [x2, y2], endPointOptions);
    const segment = board.create(
      'segment',
      [segmentEndPoint1, segmentEndPoint2],
      segmentOptions
    );
    const point = board.create('point', pointCoordinates, pointOptions);

    return new SlideMeasure(segment, segmentEndPoint1, segmentEndPoint2, point);
  };
}
