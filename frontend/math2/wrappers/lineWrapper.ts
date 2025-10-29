import { LineAttributes } from 'jsxgraph';
import * as constants from '../constants';

const defaultLineOptions: LineAttributes = {
  color: constants.COLORS.LIGHT_GRAY,
};

class LineWrapper {
  private _line: JXG.Line;
  private _point1: JXG.Point;
  private _point2: JXG.Point;

  constructor(
    board: JXG.Board,
    points: number[],
    lineOptions: LineAttributes = defaultLineOptions
  ) {
    const [x1, y1, x2, y2] = points;
    this._point1 = board.create('point', [x1, y1]);
    this._point2 = board.create('point', [x2, y2]);
    this._line = board.create(
      'line',
      [this._point1, this._point2],
      lineOptions
    );
  }

  get point1() {
    return this._point1;
  }

  get point2() {
    return this._point2;
  }
}

export default LineWrapper;
