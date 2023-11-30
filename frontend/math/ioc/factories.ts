import {
  IPointOptions,
  IPoint,
  ICircleOptions,
  ILineSegmentOptions,
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
  onPointDrag?: (e: Event) => void;
}

export interface ILineSegmentFactory {
  createLineSegment(options: ILineSegmentFactoryOptions);
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

export const TYPES = {
  FACTORIES: {
    POINT_FACTORY: Symbol('PointFactory'),
    CIRCLE_FACTORY: Symbol('CircleFactory'),
    LINE_SEGMENT_FACTORY: Symbol('LineSegmentFactory'),
    SLIDE_MEASURE_FACTORY: Symbol('SlideMeasureFactory'),
  },
};
