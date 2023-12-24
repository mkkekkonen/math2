import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  IAngleFactory,
  IPointFactory,
} from 'math/ioc/factories';
import { IAngle, ILineSegment, IPoint } from 'math/ioc/geometry';
import * as constants from 'math/constants';

import AbstractMathRenderer from './abstractMathRenderer';

const BBOX_EXTENT = 10;
const ANGLE_EXTENT = 8;

const FIXED_POINT_OPTIONS = { fixed: true, color: constants.COLORS.DARK_GRAY };

@injectable()
export default class AngleClassificationMathRenderer extends AbstractMathRenderer {
  point1: IPoint;
  point2: IPoint;
  point3: IPoint;
  lineSegment1: ILineSegment;
  lineSegment2: ILineSegment;
  angle: IAngle;

  constructor(
    @inject(FACTORY_TYPES.FACTORIES.POINT_FACTORY) pointFactory: IPointFactory,
    @inject(FACTORY_TYPES.FACTORIES.ANGLE_FACTORY) angleFactory: IAngleFactory,
    @inject(APP_TYPES.SCENE) scene: IScene
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    const point1 = pointFactory.createPoint(
      [ANGLE_EXTENT, 0],
      FIXED_POINT_OPTIONS
    );
    const point2 = pointFactory.createPoint([0, 0], FIXED_POINT_OPTIONS);
    const point3 = pointFactory.createPoint([0, ANGLE_EXTENT], {
      color: constants.COLORS.BLUE,
    });

    this.angle = angleFactory.createAngleFromPoints({
      points: [point1, point2, point3],
      angleOptions: {
        strokeColor: constants.COLORS.BLUE,
        fillColor: constants.COLORS.LIGHT_BLUE,
      },
    });
  }
}
