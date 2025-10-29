import { IBoardOptions } from 'math2/utils';
import AbstractMathRenderer from './abstractMathRenderer';
import SegmentWrapper from 'math2/wrappers/segmentWrapper';
import LineWrapper from 'math2/wrappers/lineWrapper';
import * as constants from 'math2/constants';

const BBOX_EXTENT = 10;

class PerpendicularBisectorMathRenderer extends AbstractMathRenderer {
  lineSegment: SegmentWrapper;
  line: LineWrapper;

  constructor(boardOptions: IBoardOptions) {
    super(boardOptions, BBOX_EXTENT);

    const onPointDrag = () => {
      const startPointCoordinates = {
        x: this.lineSegment.point1.X(),
        y: this.lineSegment.point1.Y(),
      };
      const endPointCoordinates = {
        x: this.lineSegment.point2.X(),
        y: this.lineSegment.point2.Y(),
      };

      const midpointCoordinates = {
        x: (startPointCoordinates.x + endPointCoordinates.x) / 2,
        y: (startPointCoordinates.y + endPointCoordinates.y) / 2,
      };

      const lineSegmentLength = Math.sqrt(
        Math.pow(endPointCoordinates.x - startPointCoordinates.x, 2) +
          Math.pow(endPointCoordinates.y - startPointCoordinates.y, 2)
      );

      const circleRadius = lineSegmentLength / 2;

      const lineSegmentAngleRadians = Math.atan2(
        endPointCoordinates.y - startPointCoordinates.y,
        endPointCoordinates.x - startPointCoordinates.x
      );

      const lineAngleRadians = lineSegmentAngleRadians + Math.PI / 2;
      const lineSecondAngleRadians = lineAngleRadians + Math.PI;

      const newLineStartPointCoords = [
        circleRadius * Math.cos(lineAngleRadians) + midpointCoordinates.x,
        circleRadius * Math.sin(lineAngleRadians) + midpointCoordinates.y,
      ];

      const newLineEndPointCoords = [
        circleRadius * Math.cos(lineSecondAngleRadians) + midpointCoordinates.x,
        circleRadius * Math.sin(lineSecondAngleRadians) + midpointCoordinates.y,
      ];

      this.line.point1.moveTo(newLineStartPointCoords);
      this.line.point2.moveTo(newLineEndPointCoords);
    };

    this.lineSegment = new SegmentWrapper(this._board, [7, 7, -7, -7], null, {
      color: constants.COLORS.BLUE,
      size: 3,
      fixed: false,
    });

    this.line = new LineWrapper(this._board, [7, -7, -7, 7], null, {
      fixed: true,
      withLabel: false,
    });

    this.lineSegment.point1.on('drag', onPointDrag);
    this.lineSegment.point2.on('drag', onPointDrag);
  }
}

export default PerpendicularBisectorMathRenderer;
