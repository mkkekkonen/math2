import { AngleAttributes, PointAttributes } from 'jsxgraph';
import * as mathUtils from 'math2/utils/mathUtils';
import * as constants from 'math2/constants';

const defaultAngleOptions: AngleAttributes = {};

const defaultPointOptions: PointAttributes = {
  face: 'o',
  size: 2,
  color: constants.COLORS.DARK_GRAY,
  fixed: true,
};

export default class AngleWrapper {
  private _angle: JXG.Angle;

  private _point1: JXG.Point;
  private _point2: JXG.Point;
  private _point3: JXG.Point;

  private _line1: JXG.Line;
  private _line2: JXG.Line;

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

  public static initialize = ({
    board,
    points,
    angleOptions = defaultAngleOptions,
    pointOptions = defaultPointOptions,
  }: {
    board: JXG.Board;
    points: number[][];
    angleOptions?: JXG.AngleAttributes;
    pointOptions?: JXG.PointAttributes;
  }) => {
    const [point1Coordinates, point2Coordinates, point3Coordinates] = points;

    const point1 = board.create('point', point1Coordinates, pointOptions);
    const point2 = board.create('point', point2Coordinates, pointOptions);
    const point3 = board.create('point', point3Coordinates, pointOptions);

    const angle = board.create('angle', [point1, point2, point3], angleOptions);

    return new AngleWrapper({
      angle,
      point1,
      point2,
      point3,
    });
  };

  public static initiazeFromPoints = ({
    board,
    point1,
    point2,
    point3,
    angleOptions = defaultAngleOptions,
  }: {
    board: JXG.Board;
    point1: JXG.Point;
    point2: JXG.Point;
    point3: JXG.Point;
    angleOptions?: JXG.AngleAttributes;
  }) => {
    const angle = board.create('angle', [point1, point2, point3], angleOptions);

    return new AngleWrapper({
      angle,
      point1,
      point2,
      point3,
    });
  };

  public static initializeFromLines = ({
    board,
    line1,
    line2,
    direction,
    angleOptions = defaultAngleOptions,
  }: {
    board: JXG.Board;
    line1: JXG.Line;
    line2: JXG.Line;
    direction: number[];
    angleOptions?: JXG.AngleAttributes;
  }): AngleWrapper => {
    const angle = board.create(
      'angle',
      [line1, line2, direction],
      angleOptions
    );

    return new AngleWrapper({
      angle,
      line1,
      line2,
    });
  };
}
