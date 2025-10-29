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
    points: number[],
    segmentOptions: SegmentAttributes = defaultSegmentOptions,
    pointOptions: JXG.PointAttributes = null
  ) {
    const [x1, y1, x2, y2] = points;
    this._point1 = board.create('point', [x1, y1], pointOptions);
    this._point2 = board.create('point', [x2, y2], pointOptions);
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
}

export default SegmentWrapper;
