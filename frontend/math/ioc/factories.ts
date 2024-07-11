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
import { ISlideControl, ISlideMeasure } from './objects';

export interface IPointFactory {
  createPoint(
    coordinates: number[],
    options?: IPointOptions,
    onDrag?: (e: Event) => void
  ): IPoint;
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

export interface ILineSegmentFactoryFromPointsOptions {
  points: IPoint[];
  lineSegmentOptions?: ILineSegmentOptions;
}

export interface ILineSegmentFactory {
  createLineSegment(options: ILineSegmentFactoryOptions): ILineSegment;
  createLineSegmentFromPoints(
    options: ILineSegmentFactoryFromPointsOptions
  ): ILineSegment;
}

export interface ILineFactoryOptions {
  coordinates: number[];
  lineOptions?: ILineOptions;
  pointOptions?: IPointOptions;
}

export interface ILineFactoryFromPointsOptions {
  points: IPoint[];
  lineOptions?: ILineOptions;
}

export interface ILineFactory {
  createLine(options: ILineFactoryOptions): ILine;
  createLineFromPoints(options: ILineFactoryFromPointsOptions): ILine;
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

export interface ISlideControlFactoryOptions {
  coordinates: number[];
  lineSegmentOptions?: ILineSegmentOptions;
  endPointOptions?: IPointOptions;
  controlPointOptions?: IPointOptions;
  externalControlPoint?: IPoint;
}

export interface ISlideControlFactory {
  createSlideControl(options: ISlideControlFactoryOptions): ISlideControl;
  createSlideControlFromExternalPoint(
    options: ISlideControlFactoryOptions
  ): ISlideControl;
}

export const TYPES = {
  FACTORIES: {
    POINT_FACTORY: Symbol('PointFactory'),
    CIRCLE_FACTORY: Symbol('CircleFactory'),
    LINE_SEGMENT_FACTORY: Symbol('LineSegmentFactory'),
    LINE_FACTORY: Symbol('LineFactory'),
    SLIDE_MEASURE_FACTORY: Symbol('SlideMeasureFactory'),
    SLIDE_CONTROL_FACTORY: Symbol('SlideControlFactory'),
    ANGLE_FACTORY: Symbol('AngleFactory'),
  },
};
