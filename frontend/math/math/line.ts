import Vector2 from './vector2';
import * as utils from '../mathUtils';

export default class Line {
  slope: number;
  yIntercept: number;

  constructor(slope: number, yIntercept: number) {
    this.slope = slope;
    this.yIntercept = yIntercept;
  }

  getY = (x: number): number => {
    return this.slope * x + this.yIntercept;
  };

  getX = (y: number): number => {
    return (y - this.yIntercept) / this.slope;
  };

  getIntersectionPoint = (line: Line): Vector2 => {
    const x = (line.yIntercept - this.yIntercept) / (this.slope - line.slope);
    const y = this.getY(x);

    return new Vector2({ x, y });
  };

  static fromTwoPoints = (point1: Vector2, point2: Vector2): Line => {
    const { x: x1, y: y1 } = point1;
    const { x: x2, y: y2 } = point2;

    const slope = (y2 - y1) / (x2 - x1);
    const yIntercept = y1 - slope * x1;

    return new Line(slope, yIntercept);
  };

  static fromAngle = (angleDegrees: number, yIntercept: number): Line => {
    const angle = utils.degreesToRadians(angleDegrees);
    const slope = Math.tan(angle);
    return new Line(slope, yIntercept);
  };

  static fromSlopeAndPoint = (slope: number, point: Vector2): Line => {
    const yIntercept = point.y - slope * point.x;
    return new Line(slope, yIntercept);
  };
}
