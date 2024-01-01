import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  IAngleFactory,
  ILineSegmentFactory,
  IPointFactory,
} from 'math/ioc/factories';
import { IAngle, ILineSegment, IPoint } from 'math/ioc/geometry';
import * as constants from 'math/constants';
import * as utils from 'math/utils';

import AbstractMathRenderer from './abstractMathRenderer';

const BBOX_EXTENT = 10;
const ANGLE_EXTENT = 8;

const FIXED_POINT_OPTIONS = {
  fixed: true,
  color: constants.COLORS.DARK_GRAY,
  withLabel: false,
};

const MOVABLE_POINT_OPTIONS = {
  color: constants.COLORS.LIGHT_BLUE,
};

const ANGLE_OPTIONS = {
  strokeColor: constants.COLORS.BLUE,
  fillColor: constants.COLORS.LIGHT_BLUE,
};

const formatLog = (alpha: number, beta: number) =>
  `α: ${alpha}°
β: ${beta}°
α + β: ${alpha + beta}°`;

const logAngles = (alpha: number, beta: number) => {
  const roundedAlpha = Math.round(alpha);
  const roundedBeta = Math.round(beta);

  return formatLog(roundedAlpha, roundedBeta);
};

@injectable()
export default class SumOfAnglesMathRenderer extends AbstractMathRenderer {
  point1: IPoint;
  point2: IPoint;
  point3: IPoint;
  point4: IPoint;
  lineSegment1: ILineSegment;
  lineSegment2: ILineSegment;
  lineSegment3: ILineSegment;
  angle1: IAngle;
  angle2: IAngle;

  constructor(
    @inject(APP_TYPES.SCENE) scene: IScene,
    @inject(FACTORY_TYPES.FACTORIES.ANGLE_FACTORY) angleFactory: IAngleFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory,
    @inject(FACTORY_TYPES.FACTORIES.POINT_FACTORY) pointFactory: IPointFactory
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    const printLog = () => {
      this.printLog(logAngles(this.angle1.getAngle(), this.angle2.getAngle()));
    };

    const getPointCoordinates = (pointName: string) => {
      switch (pointName) {
        case 'point2':
          return this.point2.getCoordinates();
        case 'point4':
          return this.point4.getCoordinates();
        default:
          throw new Error('Invalid point name');
      }
    };

    const onPointDrag = (pointName: string) => () => {
      const [x, y] = getPointCoordinates(pointName);
      const [otherX, otherY] = getPointCoordinates(
        pointName === 'point2' ? 'point4' : 'point2'
      );

      if (this.angle1.getAngle() + this.angle2.getAngle() > 360) {
        const angle = Math.atan2(otherY, otherX);

        const newX = ANGLE_EXTENT * Math.cos(angle);
        const newY = ANGLE_EXTENT * Math.sin(angle);

        this.point2.setLocation([newX, newY]);
        this.point4.setLocation([newX, newY]);

        printLog();

        return;
      }

      const angle = Math.atan2(y, x);

      const newX = ANGLE_EXTENT * Math.cos(angle);
      const newY = ANGLE_EXTENT * Math.sin(angle);

      if (pointName === 'point2') {
        this.point2.setLocation([newX, newY]);
      } else if (pointName === 'point4') {
        this.point4.setLocation([newX, newY]);
      }

      printLog();
    };

    const lineSegment1AngleInDegrees = 45;
    const lineSegment2AngleInDegrees = 135;

    const lineSegment1AngleInRadians = utils.degreesToRadians(
      lineSegment1AngleInDegrees
    );
    const lineSegment2AngleInRadians = utils.degreesToRadians(
      lineSegment2AngleInDegrees
    );

    const point2X = Math.cos(lineSegment1AngleInRadians) * ANGLE_EXTENT;
    const point2Y = Math.sin(lineSegment1AngleInRadians) * ANGLE_EXTENT;

    const point4X = Math.cos(lineSegment2AngleInRadians) * ANGLE_EXTENT;
    const point4Y = Math.sin(lineSegment2AngleInRadians) * ANGLE_EXTENT;

    this.point1 = pointFactory.createPoint([0, 0], FIXED_POINT_OPTIONS);
    this.point2 = pointFactory.createPoint(
      [point2X, point2Y],
      MOVABLE_POINT_OPTIONS,
      onPointDrag('point2')
    );
    this.point3 = pointFactory.createPoint(
      [0, ANGLE_EXTENT],
      FIXED_POINT_OPTIONS
    );
    this.point4 = pointFactory.createPoint(
      [point4X, point4Y],
      MOVABLE_POINT_OPTIONS,
      onPointDrag('point4')
    );

    this.lineSegment1 = lineSegmentFactory.createLineSegmentFromPoints({
      points: [this.point1, this.point2],
      lineSegmentOptions: { color: constants.COLORS.LIGHT_BLUE },
    });
    this.lineSegment2 = lineSegmentFactory.createLineSegmentFromPoints({
      points: [this.point1, this.point3],
      lineSegmentOptions: { color: constants.COLORS.DARK_GRAY },
    });
    this.lineSegment3 = lineSegmentFactory.createLineSegmentFromPoints({
      points: [this.point1, this.point4],
      lineSegmentOptions: { color: constants.COLORS.LIGHT_BLUE },
    });

    this.angle1 = angleFactory.createAngleFromPoints({
      points: [this.point2, this.point1, this.point3],
      angleOptions: ANGLE_OPTIONS,
    });
    this.angle2 = angleFactory.createAngleFromPoints({
      points: [this.point3, this.point1, this.point4],
      angleOptions: ANGLE_OPTIONS,
    });

    printLog();
  }
}
