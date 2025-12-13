import PointWrapper from 'math2/wrappers/pointWrapper';
import AbstractMathRenderer from './abstractMathRenderer';
import SegmentWrapper from 'math2/wrappers/segmentWrapper';
import { IBoardOptions } from 'math2/utils';
import * as constants from 'math2/constants';
import * as mathUtils from 'math2/utils/mathUtils';

const BBOX_EXTENT = 10;
const ANGLE_EXTENT = 8;

const FIXED_POINT_OPTIONS = {
  fixed: true,
  color: constants.COLORS.DARK_GRAY,
  withLabel: false,
};

const formatLog = (angle: number, description: string) =>
  `kulma/angle: ${angle}°
~ ${description}`;

const getAngleDescription = (angle: number) => {
  if (angle === 0) {
    return 'nollakulma / zero angle';
  }
  if (angle < 90) {
    return 'terävä kulma / acute angle';
  }
  if (angle === 90) {
    return 'suora kulma / right angle';
  }
  if (angle < 180) {
    return 'tylppä kulma / obtuse angle';
  }
  if (angle === 180) {
    return 'oikokulma / straight angle';
  }
  if (angle < 360) {
    return 'kupera kulma / reflex angle';
  }
  if (angle === 360) {
    return 'täysi kulma / complete angle';
  }

  return 'ei määritelty / not defined';
};

const logAngle = (angle: number) => {
  const angleRounded = Math.round(angle);
  const description = getAngleDescription(angleRounded);

  return formatLog(angleRounded, description);
};

class AngleClassificationMathRenderer extends AbstractMathRenderer {
  point1: PointWrapper;
  point2: PointWrapper;
  point3: PointWrapper;
  lineSegment: SegmentWrapper;
  angle: JXG.Angle;

  constructor(boardOptions: IBoardOptions) {
    super(boardOptions, BBOX_EXTENT);

    this.point1 = new PointWrapper(
      this._board,
      [ANGLE_EXTENT, 0],
      FIXED_POINT_OPTIONS
    );
    this.point2 = new PointWrapper(this._board, [0, 0], FIXED_POINT_OPTIONS);
    this.point3 = new PointWrapper(
      this._board,
      [0, ANGLE_EXTENT],
      {
        color: constants.COLORS.LIGHT_BLUE,
      },
      this.onPointDrag
    );

    this.lineSegment = SegmentWrapper.initializeFromPoints(
      this._board,
      this.point2.point,
      this.point3.point
    );

    this.angle = this._board.create(
      'angle',
      [this.point1.point, this.point2.point, this.point3.point],
      {
        strokeColor: constants.COLORS.BLUE,
        fillColor: constants.COLORS.LIGHT_BLUE,
      }
    );

    this.getAndLogAngle();
  }

  private getAndLogAngle = () => {
    const [x, y] = this.point3.getCoordinates();

    const angleRadians = Math.atan2(y, x);

    const positiveAngle =
      angleRadians < 0 ? angleRadians + 2 * Math.PI : angleRadians;

    const angleDegrees = mathUtils.radiansToDegrees(positiveAngle);
    this.printLog(logAngle(angleDegrees));

    return angleRadians;
  };

  private onPointDrag = () => {
    const angle = this.getAndLogAngle();

    const [newX, newY] = mathUtils.getCoordinatesFromAngle(
      angle,
      ANGLE_EXTENT,
      true
    );

    this.point3.setLocation([newX, newY]);
  };
}

export default AngleClassificationMathRenderer;
