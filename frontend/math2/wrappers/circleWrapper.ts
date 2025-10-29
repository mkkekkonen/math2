import { CircleAttributes, PointAttributes } from 'jsxgraph';
import * as constants from '../constants';

const defaultPointOptions: PointAttributes = {
  face: 'o',
  size: 0,
  color: constants.COLORS.DARK_GRAY,
  fixed: true,
  withLabel: false,
};

const defaultCircleOptions: CircleAttributes = {
  strokeColor: constants.COLORS.DARK_GRAY,
  strokeWidth: 1,
  fixed: true,
};

class CircleWrapper {
  private _point1: JXG.Point;
  private _point2: JXG.Point;
  private _circle: JXG.Circle;

  constructor(
    board: JXG.Board,
    points: number[],
    circleOptions = defaultCircleOptions,
    pointOptions = defaultPointOptions
  ) {
    const [x1, y1, x2, y2] = points;

    this._point1 = board.create('point', [x1, y1], pointOptions);
    this._point2 = board.create('point', [x2, y2], pointOptions);
    this._circle = board.create(
      'circle',
      [this._point1, this._point2],
      circleOptions
    );
  }

  get point1() {
    return this._point1;
  }

  get point2() {
    return this._point2;
  }
}

export default CircleWrapper;
