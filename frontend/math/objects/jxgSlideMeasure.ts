import * as constants from 'math/constants';
import JxgScene from 'math/wrappers/jxgScene';
import { ISlideMeasure } from 'math/ioc/objects';

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

export default class JxgSlideMeasure implements ISlideMeasure {
  _vertical: boolean;

  _segment: JXG.Segment;
  _endPoint1: JXG.Point;
  _endPoint2: JXG.Point;
  _point: JXG.Point;

  constructor(
    segment: JXG.Segment,
    endPoint1: JXG.Point,
    endPoint2: JXG.Point,
    point: JXG.Point,
    vertical: boolean
  ) {
    this._segment = segment;
    this._endPoint1 = endPoint1;
    this._endPoint2 = endPoint2;
    this._point = point;
    this._vertical = vertical;
  }

  updateValue = (value: number) => {
    if (this._vertical) {
      this._point.moveTo([this._point.X(), value]);
    } else {
      this._point.moveTo([value, this._point.Y()]);
    }
  };

  static initialize = (
    scene: JxgScene,
    lineCoordinates: number[],
    pointCoordinates: number[],
    vertical: boolean,
    lineSegmentOptions = defaultLineSegmentOptions,
    pointOptions = defaultPointOptions,
    endPointOptions = defaultEndPointOptions
  ) => {
    const [x1, y1, x2, y2] = lineCoordinates;

    const endPoint1 = scene.board.create('point', [x1, y1], endPointOptions);
    const endPoint2 = scene.board.create('point', [x2, y2], endPointOptions);
    const segment = scene.board.create(
      'segment',
      [endPoint1, endPoint2],
      lineSegmentOptions
    );
    const point = scene.board.create('point', pointCoordinates, pointOptions);

    return new JxgSlideMeasure(segment, endPoint1, endPoint2, point, vertical);
  };
}
