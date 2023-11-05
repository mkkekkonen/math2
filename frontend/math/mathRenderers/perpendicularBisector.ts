import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import AbstractMathRenderer from './abstractMathRenderer';
import { ILineSegment, ILineSegmentFactory, TYPES } from 'math/ioc';

@injectable()
class PerpendicularBisectorMathRenderer extends AbstractMathRenderer {
  lineSegment: ILineSegment;

  constructor(
    @inject(TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory
  ) {
    super();

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
