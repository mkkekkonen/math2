import { AngleAttributes, PointAttributes } from 'jsxgraph';

import { IAngle } from 'math/ioc/geometry';
import * as constants from 'math/constants';
import * as mathUtils from 'math/mathUtils';

import JxgScene from './jxgScene';

const defaultAngleOptions: AngleAttributes = {};

const defaultPointOptions: PointAttributes = {
  face: 'o',
  size: 2,
  color: constants.COLORS.DARK_GRAY,
  fixed: true,
};

export default class JxgAngle implements IAngle {
  _angle: JXG.Angle;

  _point1: JXG.Point;
  _point2: JXG.Point;
  _point3: JXG.Point;

  _line1: JXG.Line;
  _line2: JXG.Line;

  constructor(params: {
    angle: JXG.Angle;
    point1?: JXG.Point;
    point2?: JXG.Point;
    point3?: JXG.Point;
    line1?: JXG.Line;
    line2?: JXG.Line;
  }) {
    this._angle = params.angle;
    this._point1 = params.point1;
    this._point2 = params.point2;
    this._point3 = params.point3;
    this._line1 = params.line1;
    this._line2 = params.line2;
  }

  public getAngle = () => {
    return mathUtils.radiansToDegrees(this._angle.Value());
  };

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

    return new JxgAngle({ point1, point2, point3, angle });
  };

  static initializeFromPoints = ({
    scene,
    point1,
    point2,
    point3,
    angleOptions = defaultAngleOptions,
  }: {
    scene: JxgScene;
    point1: JXG.Point;
    point2: JXG.Point;
    point3: JXG.Point;
    angleOptions?: AngleAttributes;
  }) => {
    const angle = scene.board.create(
      'angle',
      [point1, point2, point3],
      angleOptions
    );

    return new JxgAngle({ point1, point2, point3, angle });
  };

  static initializeFromLines = ({
    scene,
    line1,
    line2,
    direction,
    angleOptions = defaultAngleOptions,
  }: {
    scene: JxgScene;
    line1: JXG.Line;
    line2: JXG.Line;
    direction: number[];
    angleOptions?: AngleAttributes;
  }): JxgAngle => {
    const [dir1, dir2] = direction;

    const angle = scene.board.create(
      'angle',
      [line1, line2, dir1, dir2],
      angleOptions
    );

    return new JxgAngle({ angle, line1, line2 });
  };
}
