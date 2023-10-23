import { PointAttributes, SegmentAttributes } from 'jsxgraph';

import * as constants from 'math/constants';
import { ISlideMeasure } from 'math/ioc';
import JxgScene from 'math/wrappers/jxgScene';

const defaultColor = constants.COLORS.BLUE;

const defaultLineSegmentOptions: SegmentAttributes = {
  fixed: true,
  color: defaultColor,
};

const defaultEndPointOptions: PointAttributes = {
  fixed: true,
  withLabel: false,
  color: defaultColor,
  size: 3,
};

const defaultPointOptions: PointAttributes = {
  fixed: true,
  withLabel: false,
  color: defaultColor,
  size: 4,
};

export default class SlideMeasure implements ISlideMeasure {
  _segment: JXG.Segment;
  _endPoint1: JXG.Point;
  _endPoint2: JXG.Point;
  _point: JXG.Point;

  constructor(
    segment: JXG.Segment,
    endPoint1: JXG.Point,
    endPoint2: JXG.Point,
    point: JXG.Point
  ) {
    this._segment = segment;
    this._endPoint1 = endPoint1;
    this._endPoint2 = endPoint2;
    this._point = point;
  }

  static initialize = (
    scene: JxgScene,
    lineCoordinates: number[],
    pointCoordinates: number[],
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

    return new SlideMeasure(segment, endPoint1, endPoint2, point);
  };
}
