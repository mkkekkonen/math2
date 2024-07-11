import { ISlideControl } from 'math/ioc/objects';
import * as constants from 'math/constants';
import JxgScene from 'math/wrappers/jxgScene';
import { IPoint } from 'math/ioc/geometry';
import JxgPoint from 'math/wrappers/jxgPoint';

const defaultColor = constants.COLORS.BLUE;

const defaultLineSegmentOptions: JXG.SegmentAttributes = {
  fixed: true,
  color: defaultColor,
};

const defaultEndPointOptions: JXG.PointAttributes = {
  fixed: true,
  withLabel: false,
  color: defaultColor,
  size: 3,
};

const defaultPointOptions: JXG.PointAttributes = {
  fixed: true,
  withLabel: false,
  color: defaultColor,
  size: 4,
};

export default class JxgSlideControl implements ISlideControl {
  _segment: JXG.Segment;
  _endPoint1: JXG.Point;
  _endPoint2: JXG.Point;
  _controlPoint: JXG.Point;

  constructor(
    segment: JXG.Segment,
    endPoint1: JXG.Point,
    endPoint2: JXG.Point,
    controlPoint: JXG.Point
  ) {
    this._segment = segment;
    this._endPoint1 = endPoint1;
    this._endPoint2 = endPoint2;
    this._controlPoint = controlPoint;
  }

  static initialize = (
    scene: JxgScene,
    coordinates: number[],
    lineSegmentOptions = defaultLineSegmentOptions,
    endPointOptions = defaultEndPointOptions,
    controlPointOptions = defaultPointOptions,
    externalControlPoint?: IPoint
  ) => {
    const [x1, y1, x2, y2] = coordinates;

    const endPoint1 = scene.board.create('point', [x1, y1], endPointOptions);
    const endPoint2 = scene.board.create('point', [x2, y2], endPointOptions);
    const segment = scene.board.create(
      'segment',
      [endPoint1, endPoint2],
      lineSegmentOptions
    );
    const controlPoint = externalControlPoint
      ? (externalControlPoint as JxgPoint).point
      : scene.board.create('point', [x1, y1], controlPointOptions);

    const clampX = (x: number) => {
      const leftX = Math.min(x1, x2);
      const rightX = Math.max(x1, x2);

      if (x < leftX) {
        return x1;
      }

      if (x > rightX) {
        return x2;
      }

      return x;
    };

    const clampY = (y: number) => {
      const topY = Math.max(y1, y2);
      const bottomY = Math.min(y1, y2);

      if (y > topY) {
        return y1;
      }

      if (y < bottomY) {
        return y2;
      }

      return y;
    };

    const onControlPointDrag = () => {
      const [z, x, y] = controlPoint.coords.usrCoords;

      controlPoint.setPositionDirectly(JXG.COORDS_BY_USER, [
        clampX(x),
        clampY(y),
      ]);
    };

    controlPoint.on('drag', onControlPointDrag);

    return new JxgSlideControl(segment, endPoint1, endPoint2, controlPoint);
  };
}
