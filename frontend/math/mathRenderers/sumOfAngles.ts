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
import * as mathUtils from 'math/mathUtils';
import AbstractMathRenderer from './abstractMathRenderer';

const BBOX_EXTENT = 10;
const ANGLE_EXTENT = 8;

const FIXED_POINT_OPTIONS = {
  fixed: true,
  color: constants.COLORS.DARK_GRAY,
  withLabel: false,
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
        const [newX, newY] = mathUtils.getCoordinatesWithRadius(
          otherX,
          otherY,
          ANGLE_EXTENT
        );

        this.point2.setLocation([newX, newY]);
        this.point4.setLocation([newX, newY]);

        printLog();

        return;
      }

      const [newX, newY] = mathUtils.getCoordinatesWithRadius(
        x,
        y,
        ANGLE_EXTENT
      );

      if (pointName === 'point2') {
        this.point2.setLocation([newX, newY]);
      } else if (pointName === 'point4') {
        this.point4.setLocation([newX, newY]);
      }

      printLog();
    };

    const lineSegment1AngleInDegrees = 45;
    const lineSegment2AngleInDegrees = 135;

    const [point2X, point2Y] = mathUtils.getCoordinatesFromAngle(
      lineSegment1AngleInDegrees,
      ANGLE_EXTENT
    );
    const [point4X, point4Y] = mathUtils.getCoordinatesFromAngle(
      lineSegment2AngleInDegrees,
      ANGLE_EXTENT
    );

    this.point1 = pointFactory.createPoint([0, 0], FIXED_POINT_OPTIONS);
    this.point2 = pointFactory.createPoint(
      [point2X, point2Y],
      { color: constants.COLORS.LIGHT_BLUE },
      onPointDrag('point2')
    );
    this.point3 = pointFactory.createPoint(
      [0, ANGLE_EXTENT],
      FIXED_POINT_OPTIONS
    );
    this.point4 = pointFactory.createPoint(
      [point4X, point4Y],
      { color: constants.COLORS.ORANGE },
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
      lineSegmentOptions: { color: constants.COLORS.ORANGE },
    });

    this.angle1 = angleFactory.createAngleFromPoints({
      points: [this.point2, this.point1, this.point3],
      angleOptions: {
        fillColor: constants.COLORS.LIGHT_BLUE,
        strokeColor: constants.COLORS.BLUE,
      },
    });
    this.angle2 = angleFactory.createAngleFromPoints({
      points: [this.point3, this.point1, this.point4],
      angleOptions: {
        fillColor: constants.COLORS.LIGHT_ORANGE,
        strokeColor: constants.COLORS.ORANGE,
      },
    });

    printLog();
  }
}
