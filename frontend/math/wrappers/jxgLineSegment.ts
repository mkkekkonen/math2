import { PointAttributes, SegmentAttributes } from 'jsxgraph';

import { ILineSegment } from 'math/ioc/geometry';
import * as constants from 'math/constants';

import JxgScene from './jxgScene';

const defaultLineSegmentOptions: SegmentAttributes = {
  color: constants.COLORS.DARK_GRAY,
  fixed: true,
};

const defaultPointOptions: PointAttributes = {
  face: 'o',
  size: 2,
  color: constants.COLORS.DARK_GRAY,
  fixed: true,
};

export default class JxgLineSegment implements ILineSegment {
  _point1: JXG.Point;
  _point2: JXG.Point;
  _lineSegment: JXG.Segment;

  constructor(point1: JXG.Point, point2: JXG.Point, lineSegment: JXG.Segment) {
    this._point1 = point1;
    this._point2 = point2;
    this._lineSegment = lineSegment;
  }

  setLocation = (
    startPointCoordinates: number[],
    endPointCoordinates: number[]
  ) => {
    this._point1.moveTo(startPointCoordinates);
    this._point2.moveTo(endPointCoordinates);
  };

  getStartPointCoordinates = () => {
    return [this._point1.X(), this._point1.Y()];
  };

  getEndPointCoordinates = () => {
    return [this._point2.X(), this._point2.Y()];
  };

  setStartPointLocation = (coordinates: number[]) => {
    this._point1.moveTo(coordinates);
  };

  setEndPointLocation = (coordinates: number[]) => {
    this._point2.moveTo(coordinates);
  };

  static initialize = ({
    scene,
    points,
    onPointDrag,
    lineSegmentOptions = defaultLineSegmentOptions,
    pointOptions = defaultPointOptions,
  }: {
    scene: JxgScene;
    points: number[];
    onPointDrag: (isStartPoint?: boolean) => (e: Event) => void;
    lineSegmentOptions: SegmentAttributes;
    pointOptions: PointAttributes;
  }) => {
    const [x1, y1, x2, y2] = points;

    const point1 = scene.board.create('point', [x1, y1], pointOptions);
    const point2 = scene.board.create('point', [x2, y2], pointOptions);

    if (onPointDrag) {
      point1.on('drag', onPointDrag(true));
      point2.on('drag', onPointDrag(false));
    }

    const segment = scene.board.create(
      'segment',
      [point1, point2],
      lineSegmentOptions
    );

    return new JxgLineSegment(point1, point2, segment);
  };

  static initializeFromPoints = ({
    scene,
    points,
    lineSegmentOptions = defaultLineSegmentOptions,
  }: {
    scene: JxgScene;
    points: JXG.Point[];
    lineSegmentOptions: SegmentAttributes;
  }) => {
    const [point1, point2] = points;

    const segment = scene.board.create(
      'segment',
      [point1, point2],
      lineSegmentOptions
    );

    return new JxgLineSegment(point1, point2, segment);
  };
}
