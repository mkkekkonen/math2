export interface IMathRenderer {
  initialize(): void;
  animate(timeStamp: number): void;
  printLog(log: string): void;
  endAnimation(): void;
}

export interface IScene {
  initialize(bboxExtent?: number): void;
  destroy(): void;
}

export interface ISceneOptions {
  axis?: boolean;
  grid?: boolean;
}

export interface IPoint {}

export interface IPointOptions {
  face?: string;
  size?: number;
  color?: string;
  fixed?: boolean;
  coordinates?: number[];
  withLabel?: boolean;
}

export interface IPointFactory {
  createPoint(options: IPointOptions): IPoint;
}

export interface ICircle {}

export interface ICircleOptions {
  strokeColor?: string;
  strokeWidth?: number;
  fixed?: boolean;
}

export interface ICircleFactoryOptions {
  coordinates: number[];
  circleOptions?: ICircleOptions;
  pointOptions?: IPointOptions;
}

export interface ICircleFactory {
  createCircle(options: ICircleFactoryOptions);
}

export interface ILineSegment {
  setLocation(startPointCoordinates: number[], endPointCoordinates: number[]);
  getStartPointCoordinates(): number[];
  getEndPointCoordinates(): number[];
  setStartPointLocation(coordinates: number[]);
  setEndPointLocation(coordinates: number[]);
}

export interface ILineSegmentOptions {
  color?: string;
  fixed?: boolean;
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

export interface ILine {
  setLocation(startPointCoordinates: number[], endPointCoordinates: number[]);
}

export interface ILineOptions {
  color?: string;
}

export interface ISlideMeasure {
  updateValue(value: number);
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
  ENTRY_POINT_TYPES: {
    START_PAGE: Symbol('StartPage'),
    PERPENDICULAR_BISECTOR: Symbol('PerpendicularBisector'),
  },
  BOARD_CONFIG: Symbol('BoardConfig'),
  SCENE: Symbol('Scene'),
  GEOMETRY: {
    POINT: Symbol('Point'),
    CIRCLE: Symbol('Circle'),
    LINE: Symbol('Line'),
  },
  OBJECTS: {
    SLIDE_MEASURE: Symbol('SlideMeasure'),
  },
  FACTORIES: {
    POINT_FACTORY: Symbol('PointFactory'),
    CIRCLE_FACTORY: Symbol('CircleFactory'),
    LINE_SEGMENT_FACTORY: Symbol('LineSegmentFactory'),
    SLIDE_MEASURE_FACTORY: Symbol('SlideMeasureFactory'),
  },
};
