import { PointAttributes, CircleAttributes } from 'jsxgraph';

import * as constants from 'math/constants';
import { ICircle } from 'math/ioc/geometry';

import JxgScene from './jxgScene';

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

export default class JxgCircle implements ICircle {
  _point1: JXG.Point;
  _point2: JXG.Point;
  _circle: JXG.Circle;

  constructor(point1: JXG.Point, point2: JXG.Point, circle: JXG.Circle) {
    this._point1 = point1;
    this._point2 = point2;
    this._circle = circle;
  }

  static initialize = (
    scene: JxgScene,
    points: number[],
    circleOptions = defaultCircleOptions,
    pointOptions = defaultPointOptions
  ): ICircle => {
    const [x1, y1, x2, y2] = points;

    const point1 = scene.board.create('point', [x1, y1], pointOptions);
    const point2 = scene.board.create('point', [x2, y2], pointOptions);

    const circle = scene.board.create(
      'circle',
      [point1, point2],
      circleOptions
    );

    return new JxgCircle(point1, point2, circle);
  };
}
