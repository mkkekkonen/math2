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

const ANGLE_OPTIONS = {
  strokeColor: constants.COLORS.BLUE,
  fillColor: constants.COLORS.LIGHT_BLUE,
};

const formatLog = (alpha: number, beta: number) =>
  `α: ${alpha}°
β: ${beta}°`;

const logAngles = (alpha: number, beta: number) => {
  const roundedAlpha = Math.round(alpha);
  const roundedBeta = Math.round(beta);

  return formatLog(roundedAlpha, roundedBeta);
};

@injectable()
export default class AngleBisectorMathRenderer extends AbstractMathRenderer {
  point1: IPoint;
  point2: IPoint;
  point3: IPoint;
  point4: IPoint;
  bisector: ILineSegment;
  lineSegment: ILineSegment;
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

    const onPointDrag = () => {
      const [x, y] = this.point4.getCoordinates();

      const angle = Math.atan2(y, x);

      const positiveAngle = angle < 0 ? angle + 2 * Math.PI : angle;
      if (positiveAngle > Math.PI && positiveAngle < 1.5 * Math.PI) {
        this.point3.setLocation([0, ANGLE_EXTENT]);
        this.point4.setLocation([-ANGLE_EXTENT, 0]);
        return;
      } else if (positiveAngle >= 1.5 * Math.PI) {
        this.point3.setLocation([ANGLE_EXTENT, 0]);
        this.point4.setLocation([ANGLE_EXTENT, 0]);
        return;
      }

      const newX = ANGLE_EXTENT * Math.cos(angle);
      const newY = ANGLE_EXTENT * Math.sin(angle);

      this.point4.setLocation([newX, newY]);

      const bisectorAngle = positiveAngle / 2;
      const bisectorX = ANGLE_EXTENT * Math.cos(bisectorAngle);
      const bisectorY = ANGLE_EXTENT * Math.sin(bisectorAngle);

      this.point3.setLocation([bisectorX, bisectorY]);

      printLog();
    };

    const printLog = () => {
      this.printLog(logAngles(this.angle1.getAngle(), this.angle2.getAngle()));
    };

    this.point1 = pointFactory.createPoint(
      [ANGLE_EXTENT, 0],
      FIXED_POINT_OPTIONS
    );
    this.point2 = pointFactory.createPoint([0, 0], FIXED_POINT_OPTIONS);
    this.point4 = pointFactory.createPoint(
      [0, ANGLE_EXTENT],
      {
        color: constants.COLORS.LIGHT_BLUE,
      },
      onPointDrag
    );

    const bisectorAngleInDegrees = 45;
    const bisectorAngleInRadians = utils.degreesToRadians(
      bisectorAngleInDegrees
    );
    const bisectorX = ANGLE_EXTENT * Math.cos(bisectorAngleInRadians);
    const bisectorY = ANGLE_EXTENT * Math.sin(bisectorAngleInRadians);

    this.point3 = pointFactory.createPoint([bisectorX, bisectorY], {
      color: constants.COLORS.RED,
      withLabel: false,
      fixed: true,
    });

    this.bisector = lineSegmentFactory.createLineSegmentFromPoints({
      points: [this.point2, this.point3],
      lineSegmentOptions: { color: constants.COLORS.RED },
    });
    this.lineSegment = lineSegmentFactory.createLineSegmentFromPoints({
      points: [this.point2, this.point4],
    });

    this.angle1 = angleFactory.createAngleFromPoints({
      points: [this.point1, this.point2, this.point3],
      angleOptions: ANGLE_OPTIONS,
    });
    this.angle2 = angleFactory.createAngleFromPoints({
      points: [this.point3, this.point2, this.point4],
      angleOptions: ANGLE_OPTIONS,
    });

    printLog();
  }
}
