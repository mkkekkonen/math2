import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import AbstractMathRenderer from './abstractMathRenderer';
import { ILineSegment, ILineSegmentFactory, IScene, TYPES } from 'math/ioc';

const BBOX_EXTENT = 10;

@injectable()
class PerpendicularBisectorMathRenderer extends AbstractMathRenderer {
  lineSegment: ILineSegment;

  constructor(
    @inject(TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory,
    @inject(TYPES.SCENE) scene: IScene
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    this.lineSegment = lineSegmentFactory.createLineSegment({
      coordinates: [-7, -7, 7, 7],
      pointOptions: {
        color: '#bbf',
        size: 3,
        fixed: false,
      },
    });
  }
}

export default PerpendicularBisectorMathRenderer;
