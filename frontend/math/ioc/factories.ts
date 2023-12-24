import {
  IPointOptions,
  IPoint,
  ICircleOptions,
  ILineSegmentOptions,
  ILineOptions,
  IAngleOptions,
  ICircle,
  ILineSegment,
  ILine,
  IAngle,
} from './geometry';
import { ISlideMeasure } from './objects';

export interface IPointFactory {
  createPoint(coordinates: number[], options?: IPointOptions): IPoint;
}

export interface ICircleFactoryOptions {
  coordinates: number[];
  circleOptions?: ICircleOptions;
  pointOptions?: IPointOptions;
}

export interface ICircleFactory {
  createCircle(options: ICircleFactoryOptions): ICircle;
}

export interface ILineSegmentFactoryOptions {
  coordinates: number[];
  lineSegmentOptions?: ILineSegmentOptions;
  pointOptions?: IPointOptions;
  onPointDrag?: (isStartPoint?: boolean) => (e: Event) => void;
}

export interface ILineSegmentFactory {
  createLineSegment(options: ILineSegmentFactoryOptions): ILineSegment;
}

export interface ILineFactoryOptions {
  coordinates: number[];
  lineOptions?: ILineOptions;
  pointOptions?: IPointOptions;
}

export interface ILineFactory {
  createLine(options: ILineFactoryOptions): ILine;
}

export interface IAngleFactoryOptions {
  coordinates: number[][];
  angleOptions?: IAngleOptions;
  pointOptions?: IPointOptions;
}

export interface IAngleFactoryFromPointsOptions {
  points: IPoint[];
  angleOptions?: IAngleOptions;
  pointOptions?: IPointOptions;
}

export interface IAngleFactory {
  createAngle(options: IAngleFactoryOptions): IAngle;
  createAngleFromPoints(options: IAngleFactoryFromPointsOptions): IAngle;
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
  createSlideMeasure(options: ISlideMeasureFactoryOptions): ISlideMeasure;
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
