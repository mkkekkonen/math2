export interface IMathRenderer {
  initialize(): void;
  animate(timeStamp: number): void;
  printLog(log: string): void;
}

export interface IScene {
  initialize(options: any): void;
}

export interface ISceneOptions {
  bboxExtent?: number;
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

export interface ILineSegment {}

export interface ILineSegmentOptions {
  color?: string;
  fixed?: boolean;
}

export interface ILineSegmentFactoryOptions {
  coordinates: number[];
  lineSegmentOptions?: ILineSegmentOptions;
  pointOptions?: IPointOptions;
}

export interface ILineSegmentFactory {
  createLineSegment(options: ILineSegmentFactoryOptions);
}

export const TYPES = {
  ENTRY_POINT_TYPES: {
    START_PAGE: Symbol('StartPage'),
  },
  BOARD_CONFIG: Symbol('BoardConfig'),
  SCENE: Symbol('Scene'),
  GEOMETRY: {
    POINT: Symbol('Point'),
    CIRCLE: Symbol('Circle'),
    LINE: Symbol('Line'),
  },
  FACTORIES: {
    POINT_FACTORY: Symbol('PointFactory'),
    CIRCLE_FACTORY: Symbol('CircleFactory'),
    LINE_SEGMENT_FACTORY: Symbol('LineSegmentFactory'),
  },
};
