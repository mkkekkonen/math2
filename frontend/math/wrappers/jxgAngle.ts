import { AngleAttributes, PointAttributes } from 'jsxgraph';

import { IAngle } from 'math/ioc/geometry';
import * as constants from 'math/constants';

import JxgScene from './jxgScene';

const defaultAngleOptions: AngleAttributes = {};

const defaultPointOptions: PointAttributes = {
  face: 'o',
  size: 2,
  color: constants.COLORS.DARK_GRAY,
  fixed: true,
};

export default class JxgAngle implements IAngle {
  _point1: JXG.Point;
  _point2: JXG.Point;
  _point3: JXG.Point;

  _angle: JXG.Angle;

  constructor(
    point1: JXG.Point,
    point2: JXG.Point,
    point3: JXG.Point,
    angle: JXG.Angle
  ) {
    this._point1 = point1;
    this._point2 = point2;
    this._point3 = point3;
    this._angle = angle;
  }

  static initialize = ({
    scene,
    points,
    angleOptions = defaultAngleOptions,
    pointOptions = defaultPointOptions,
  }: {
    scene: JxgScene;
    points: number[][];
    angleOptions?: AngleAttributes;
    pointOptions?: PointAttributes;
  }) => {
    const [point1Coordinates, point2Coordinates, point3Coordinates] = points;

    const point1 = scene.board.create('point', point1Coordinates, pointOptions);
    const point2 = scene.board.create('point', point2Coordinates, pointOptions);
    const point3 = scene.board.create('point', point3Coordinates, pointOptions);

    const angle = scene.board.create(
      'angle',
      [point1, point2, point3],
      angleOptions
    );

    return new JxgAngle(point1, point2, point3, angle);
  };
}
