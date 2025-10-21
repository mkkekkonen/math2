import { inject, injectable } from 'inversify';

import { ILine, ILineSegment, IPoint } from 'math/ioc/geometry';
import { TYPES as APP_TYPES, IScene } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  ILineFactory,
  ILineSegmentFactory,
  IPointFactory,
} from 'math/ioc/factories';

import AbstractMathRenderer from './abstractMathRenderer';
import Line from 'math/math/line';

const BBOX_EXTENT = 10;

@injectable()
export default class LineSegmentProjectionMathRenderer extends AbstractMathRenderer {
  lineSegmentStartPoint: IPoint;
  lineSegmentEndPoint: IPoint;

  projectedLineSegmentStartPoint: IPoint;
  projectedLineSegmentEndPoint: IPoint;

  lineSegment: ILineSegment;
  projectedLineSegment: ILineSegment;

  fixedLine: ILine;
  fixedLineEquation: Line;

  constructor(
    @inject(APP_TYPES.SCENE) scene: IScene,
    @inject(FACTORY_TYPES.FACTORIES.LINE_FACTORY)
    private lineFactory: ILineFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    private lineSegmentFactory: ILineSegmentFactory,
    @inject(FACTORY_TYPES.FACTORIES.POINT_FACTORY)
    private pointFactory: IPointFactory
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);
  }
}
