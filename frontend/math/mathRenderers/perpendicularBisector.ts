import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import {
  ILineSegmentFactory,
  TYPES as FACTORY_TYPES,
  ILineFactory,
} from 'math/ioc/factories';
import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import { ILineSegment, ILine } from 'math/ioc/geometry';

import AbstractMathRenderer from './abstractMathRenderer';

const BBOX_EXTENT = 10;

@injectable()
class PerpendicularBisectorMathRenderer extends AbstractMathRenderer {
  lineSegment: ILineSegment;
  line: ILine;

  constructor(
    @inject(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_FACTORY)
    lineFactory: ILineFactory,
    @inject(APP_TYPES.SCENE) scene: IScene
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    const onPointDrag = () => () => {
      const startPointCoordinates = this.lineSegment.getStartPointCoordinates();
      const endPointCoordinates = this.lineSegment.getEndPointCoordinates();

      const midpointCoordinates = [
        (startPointCoordinates[0] + endPointCoordinates[0]) / 2,
        (startPointCoordinates[1] + endPointCoordinates[1]) / 2,
      ];

      const [midX, midY] = midpointCoordinates;

      // calculate line segment length with the Pythagorean theorem
      const lineSegmentLength = Math.sqrt(
        Math.pow(endPointCoordinates[0] - startPointCoordinates[0], 2) +
          Math.pow(endPointCoordinates[1] - startPointCoordinates[1], 2)
      );

      // the radius of the imaginary "circle" around the line segment
      // is half the length of the line segment
      const circleRadius = lineSegmentLength / 2;

      // calculate the angle between the line segment and the positive
      // x-axis
      const lineSegmentAngleRadians = Math.atan2(
        endPointCoordinates[1] - startPointCoordinates[1],
        endPointCoordinates[0] - startPointCoordinates[0]
      );

      // add 90 degrees to the angle between the line segment and the
      // positive x-axis to get the first angle of the perpendicular bisector
      const lineAngleRadians = lineSegmentAngleRadians + Math.PI / 2;

      // add 180 degrees to the angle between the line segment and the
      // positive x-axis to get the second angle of the perpendicular bisector
      const lineSecondAngleRadians = lineAngleRadians + Math.PI;

      // Calculate the start point coordinates of the perpendicular bisector.
      // Add the midpoint coordinates to the bisector's coordinates to place it
      // in the correct location.
      const newLineStartPointCoords = [
        circleRadius * Math.cos(lineAngleRadians) + midX,
        circleRadius * Math.sin(lineAngleRadians) + midY,
      ];

      // Add the midpoint coordinates to the bisector's coordinates to place it
      // in the correct location.
      const newLineEndPointCoords = [
        circleRadius * Math.cos(lineSecondAngleRadians) + midX,
        circleRadius * Math.sin(lineSecondAngleRadians) + midY,
      ];

      this.line.setLocation(newLineStartPointCoords, newLineEndPointCoords);
    };

    this.lineSegment = lineSegmentFactory.createLineSegment({
      coordinates: [7, 7, -7, -7],
      pointOptions: {
        color: '#bbf',
        size: 3,
        fixed: false,
      },
      onPointDrag,
    });

    this.line = lineFactory.createLine({
      coordinates: [7, -7, -7, 7],
      pointOptions: { fixed: true, withLabel: false },
    });
  }
}

export default PerpendicularBisectorMathRenderer;
