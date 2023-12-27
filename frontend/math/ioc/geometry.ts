export interface IPoint {
  getCoordinates(): number[];
  setLocation(coordinates: number[]);
}

export interface IPointOptions {
  face?: string;
  size?: number;
  color?: string;
  fixed?: boolean;
  withLabel?: boolean;
}

export interface ICircle {}

export interface ICircleOptions {
  strokeColor?: string;
  strokeWidth?: number;
  fixed?: boolean;
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

export interface ILine {
  setLocation(startPointCoordinates: number[], endPointCoordinates: number[]);
}

export interface ILineOptions {
  color?: string;
}

export interface IAngle {
  getAngle(): number;
}

export interface IAngleOptions {
  fillColor?: string;
  strokeColor?: string;
}

export const TYPES = {
  GEOMETRY: {
    POINT: Symbol('Point'),
    CIRCLE: Symbol('Circle'),
    LINE: Symbol('Line'),
  },
};
