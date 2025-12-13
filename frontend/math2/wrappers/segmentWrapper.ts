import { SegmentAttributes } from 'jsxgraph';
import * as constants from '../constants';

const defaultSegmentOptions: SegmentAttributes = {
  color: constants.COLORS.LIGHT_GRAY,
};

class SegmentWrapper {
  private _segment: JXG.Line;
  private _point1: JXG.Point;
  private _point2: JXG.Point;

  constructor(
    board: JXG.Board,
    points: JXG.Point[],
    segmentOptions?: SegmentAttributes
  ) {
    this._point1 = points[0];
    this._point2 = points[1];

    this._segment = board.create(
      'segment',
      [this._point1, this._point2],
      segmentOptions
    );
  }

  get point1() {
    return this._point1;
  }

  get point2() {
    return this._point2;
  }

  public static initialize = (
    board: JXG.Board,
    points: number[],
    segmentOptions: SegmentAttributes = defaultSegmentOptions,
    pointOptions: JXG.PointAttributes = null
  ) => {
    const [x1, y1, x2, y2] = points;
    const point1 = board.create('point', [x1, y1], pointOptions);
    const point2 = board.create('point', [x2, y2], pointOptions);
    return new SegmentWrapper(board, [point1, point2], segmentOptions);
  };

  public static initializeFromPoints = (
    board: JXG.Board,
    point1: JXG.Point,
    point2: JXG.Point,
    segmentOptions: SegmentAttributes = defaultSegmentOptions
  ) => {
    return new SegmentWrapper(board, [point1, point2], segmentOptions);
  };
}

export default SegmentWrapper;
