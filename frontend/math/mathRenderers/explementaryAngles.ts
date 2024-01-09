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
export default class ExplementaryAnglesMathRenderer extends AbstractMathRenderer {
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

    const [pointX, pointY] = mathUtils.getCoordinatesFromAngle(
      135,
      ANGLE_EXTENT
    );

    this.point1 = pointFactory.createPoint([0, 0], FIXED_POINT_OPTIONS);
    this.point2 = pointFactory.createPoint(
      [ANGLE_EXTENT, 0],
      FIXED_POINT_OPTIONS
    );
    this.point3 = pointFactory.createPoint([pointX, pointY], {
      color: constants.COLORS.LIGHT_BLUE,
    });

    this.lineSegment1 = lineSegmentFactory.createLineSegmentFromPoints({
      points: [this.point1, this.point2],
      lineSegmentOptions: {
        color: constants.COLORS.DARK_GRAY,
      },
    });
    this.lineSegment2 = lineSegmentFactory.createLineSegmentFromPoints({
      points: [this.point1, this.point3],
      lineSegmentOptions: {
        color: constants.COLORS.LIGHT_BLUE,
      },
    });

    this.angle1 = angleFactory.createAngleFromPoints({
      points: [this.point2, this.point1, this.point3],
      angleOptions: ANGLE_OPTIONS,
    });
    this.angle2 = angleFactory.createAngleFromPoints({
      points: [this.point3, this.point1, this.point2],
      angleOptions: ANGLE_OPTIONS,
    });
  }
}
