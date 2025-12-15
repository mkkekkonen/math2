import PointWrapper from 'math2/wrappers/pointWrapper';
import AbstractMathRenderer from './abstractMathRenderer';
import SegmentWrapper from 'math2/wrappers/segmentWrapper';
import { IBoardOptions } from 'math2/utils';
import * as mathUtils from 'math2/utils/mathUtils';
import * as constants from 'math2/constants';
import AngleWrapper from 'math2/wrappers/angleWrapper';

const BBOX_EXTENT = 10;
const ANGLE_EXTENT = 8;
const INITIAL_BISECTOR_ANGLE = 45;

const FIXED_POINT_OPTIONS = {
  fixed: true,
  color: constants.COLORS.DARK_GRAY,
  withLabel: false,
};

const formatLog = (alpha: number, beta: number) =>
  `α: ${alpha}°
β: ${beta}°`;

const logAngles = (alpha: number, beta: number) => {
  const roundedAlpha = Math.round(alpha);
  const roundedBeta = Math.round(beta);

  return formatLog(roundedAlpha, roundedBeta);
};

export default class AngleBisectorMathRenderer extends AbstractMathRenderer {
  point1: PointWrapper;
  point2: PointWrapper;
  point3: PointWrapper;
  point4: PointWrapper;
  bisector: SegmentWrapper;
  lineSegment: SegmentWrapper;
  angle1: AngleWrapper;
  angle2: AngleWrapper;

  constructor(boardOptions: IBoardOptions) {
    super(boardOptions, BBOX_EXTENT);

    this.point1 = new PointWrapper(
      this._board,
      [ANGLE_EXTENT, 0],
      FIXED_POINT_OPTIONS
    );
    this.point2 = new PointWrapper(this._board, [0, 0], FIXED_POINT_OPTIONS);
    this.point4 = new PointWrapper(
      this._board,
      [0, ANGLE_EXTENT],
      {
        color: constants.COLORS.LIGHT_BLUE,
      },
      this.onPointDrag
    );

    const bisectorAngleRadians = mathUtils.degreesToRadians(
      INITIAL_BISECTOR_ANGLE
    );
    const bisectorX = ANGLE_EXTENT * Math.cos(bisectorAngleRadians);
    const bisectorY = ANGLE_EXTENT * Math.sin(bisectorAngleRadians);

    this.point3 = new PointWrapper(this._board, [bisectorX, bisectorY], {
      color: constants.COLORS.RED,
      withLabel: false,
      fixed: true,
    });

    this.bisector = SegmentWrapper.initializeFromPoints(
      this._board,
      this.point2.point,
      this.point3.point,
      { color: constants.COLORS.RED }
    );
    this.lineSegment = SegmentWrapper.initializeFromPoints(
      this._board,
      this.point2.point,
      this.point4.point
    );

    this.angle1 = AngleWrapper.initiazeFromPoints({
      board: this._board,
      point1: this.point1.point,
      point2: this.point2.point,
      point3: this.point3.point,
      angleOptions: {
        fillColor: constants.COLORS.LIGHT_BLUE,
        strokeColor: constants.COLORS.BLUE,
      },
    });
    this.angle2 = AngleWrapper.initiazeFromPoints({
      board: this._board,
      point1: this.point3.point,
      point2: this.point2.point,
      point3: this.point4.point,
      angleOptions: {
        fillColor: constants.COLORS.LIGHT_ORANGE,
        strokeColor: constants.COLORS.ORANGE,
      },
    });
  }

  private printAngleLog = () => {
    this.printLog(logAngles(this.angle1.getAngle(), this.angle2.getAngle()));
  };

  private onPointDrag = () => {
    const [x, y] = this.point4.getCoordinates();

    const angleRadians = Math.atan2(y, x);

    const positiveAngle =
      angleRadians < 0 ? angleRadians + 2 * Math.PI : angleRadians;

    if (positiveAngle > Math.PI && positiveAngle < 1.5 * Math.PI) {
      this.point3.setLocation([0, ANGLE_EXTENT]);
      this.point4.setLocation([-ANGLE_EXTENT, 0]);
      return;
    } else if (positiveAngle >= 1.5 * Math.PI) {
      this.point3.setLocation([ANGLE_EXTENT, 0]);
      this.point4.setLocation([ANGLE_EXTENT, 0]);
      return;
    }

    const [newX, newY] = mathUtils.getCoordinatesFromAngle(
      angleRadians,
      ANGLE_EXTENT,
      true
    );

    this.point4.setLocation([newX, newY]);

    const bisectorAngle = positiveAngle / 2;
    const [bisectorX, bisectorY] = mathUtils.getCoordinatesFromAngle(
      bisectorAngle,
      ANGLE_EXTENT,
      true
    );

    this.point3.setLocation([bisectorX, bisectorY]);

    this.printAngleLog();
  };
}
