import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import { TYPES as FACTORY_TYPES, IAngleFactory } from 'math/ioc/factories';
import { IAngle, ILineSegment } from 'math/ioc/geometry';

import AbstractMathRenderer from './abstractMathRenderer';

const BBOX_EXTENT = 10;
const ANGLE_EXTENT = 8;

@injectable()
export default class AngleClassificationMathRenderer extends AbstractMathRenderer {
  lineSegment1: ILineSegment;
  lineSegment2: ILineSegment;
  angle: IAngle;

  constructor(
    @inject(FACTORY_TYPES.FACTORIES.ANGLE_FACTORY) angleFactory: IAngleFactory,
    @inject(APP_TYPES.SCENE) scene: IScene
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    this.angle = angleFactory.createAngle({
      coordinates: [
        [ANGLE_EXTENT, 0],
        [0, 0],
        [0, ANGLE_EXTENT],
      ],
      pointOptions: {
        fixed: false,
      },
    });
  }
}
