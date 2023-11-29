import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import {
  ILine,
  ILineSegment,
  ILineSegmentFactory,
  IScene,
  TYPES,
} from 'math/ioc';
import * as utils from 'math/utils';

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
    @inject(TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory,
    @inject(TYPES.SCENE) scene: IScene
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
