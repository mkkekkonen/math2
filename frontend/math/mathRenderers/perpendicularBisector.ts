import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import {
  ILineSegmentFactory,
  TYPES as FACTORY_TYPES,
} from 'math/ioc/factories';
import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import { ILineSegment, ILine } from 'math/ioc/geometry';

import AbstractMathRenderer from './abstractMathRenderer';
import Vector2 from 'math/math/vector2';
import { calculateAngleBetweenPointAndCircle } from 'math/mathUtils';

const BBOX_EXTENT = 10;
const CIRCLE_RADIUS = 8;

@injectable()
class PerpendicularBisectorMathRenderer extends AbstractMathRenderer {
  lineSegment: ILineSegment;
  line: ILine;

  constructor(
    @inject(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory,
    @inject(APP_TYPES.SCENE) scene: IScene
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    const onPointDrag = (isStartPoint: boolean) => () => {
      const pointCoords = isStartPoint
        ? this.lineSegment.getStartPointCoordinates()
        : this.lineSegment.getEndPointCoordinates();

      const [x, y] = pointCoords;

      const deltaVector = new Vector2({ x, y });

      const angleRadians = calculateAngleBetweenPointAndCircle(
        new Vector2(),
        deltaVector
      );

      const newCoords = [
        CIRCLE_RADIUS * Math.cos(angleRadians),
        CIRCLE_RADIUS * Math.sin(angleRadians),
      ];

      if (isStartPoint) {
        this.lineSegment.setStartPointLocation(newCoords);
      } else {
        this.lineSegment.setEndPointLocation(newCoords);
      }
    };

    this.lineSegment = lineSegmentFactory.createLineSegment({
      coordinates: [7, 7, -7, -7],
      pointOptions: {
        color: '#bbf',
        size: 3,
        fixed: false,
      },
    });
  }
}

export default PerpendicularBisectorMathRenderer;
