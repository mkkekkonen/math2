import {
  IPointOptions,
  IPoint,
  ICircleOptions,
  ILineSegmentOptions,
  ILineOptions,
  IAngleOptions,
} from './geometry';

export interface IPointFactory {
  createPoint(options: IPointOptions): IPoint;
}

export interface ICircleFactoryOptions {
  coordinates: number[];
  circleOptions?: ICircleOptions;
  pointOptions?: IPointOptions;
}

export interface ICircleFactory {
  createCircle(options: ICircleFactoryOptions);
}

export interface ILineSegmentFactoryOptions {
  coordinates: number[];
  lineSegmentOptions?: ILineSegmentOptions;
  pointOptions?: IPointOptions;
  onPointDrag?: (isStartPoint?: boolean) => (e: Event) => void;
}

export interface ILineSegmentFactory {
  createLineSegment(options: ILineSegmentFactoryOptions);
}

export interface ILineFactoryOptions {
  coordinates: number[];
  lineOptions?: ILineOptions;
  pointOptions?: IPointOptions;
}

export interface ILineFactory {
  createLine(options: ILineFactoryOptions);
}

export interface ISlideMeasureFactoryOptions {
  lineSegmentCoordinates: number[];
  pointCoordinates: number[];
  vertical: boolean;
  lineSegmentOptions?: ILineSegmentOptions;
  endPointOptions?: IPointOptions;
  pointOptions?: IPointOptions;
}

export interface ISlideMeasureFactory {
  createSlideMeasure(options: ISlideMeasureFactoryOptions);
}

export interface IAngleFactoryOptions {
  coordinates: number[][];
  angleOptions?: IAngleOptions;
  pointOptions?: IPointOptions;
}

export interface IAngleFactory {
  createAngle(options: IAngleFactoryOptions);
}

export const TYPES = {
  FACTORIES: {
    POINT_FACTORY: Symbol('PointFactory'),
    CIRCLE_FACTORY: Symbol('CircleFactory'),
    LINE_SEGMENT_FACTORY: Symbol('LineSegmentFactory'),
    LINE_FACTORY: Symbol('LineFactory'),
    SLIDE_MEASURE_FACTORY: Symbol('SlideMeasureFactory'),
    ANGLE_FACTORY: Symbol('AngleFactory'),
  },
};
