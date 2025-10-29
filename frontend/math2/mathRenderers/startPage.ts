import CircleWrapper from 'math2/wrappers/circleWrapper';
import AbstractMathRenderer from './abstractMathRenderer';
import { IBoardOptions } from 'math2/utils';
import * as mathUtils from 'math2/utils/mathUtils';
import SegmentWrapper from 'math2/wrappers/segmentWrapper';

const FULL_CIRCLE = 360;
const SLIDE_MEASURE_COORDINATE = 1.2;
const ANGLE_STEP = 0.1;
const BBOX_EXTENT = 1.5;

const formatLog = (sine: number, cosine: number, angle: number) =>
  `- sine: ${sine}
- cosine: ${cosine}
- angle: ${angle}
`;

class StartPageMathRenderer extends AbstractMathRenderer {
  _animatable = true;

  angleDegrees = 0;
  previousTimeStamp = 0;

  circle: CircleWrapper;
  line: SegmentWrapper;
  angle: JXG.Angle;

  constructor(boardOptions: IBoardOptions) {
    super(boardOptions, BBOX_EXTENT);

    this.line = new SegmentWrapper(this._board, [0, 0, 1, 0]);
    this.circle = new CircleWrapper(this._board, [0, 0, 1, 0]);
    this.angle = this._board.create(
      'angle',
      [this.circle.point2, this.line.point1, this.line.point2],
      {
        radius: 0.5,
      }
    );
    requestAnimationFrame(this.animate);
  }

  override animate = (timeStamp: number) => {
    try {
      const deltaTime = timeStamp - this.previousTimeStamp;

      this.angleDegrees += ANGLE_STEP * deltaTime;
      if (this.angleDegrees >= FULL_CIRCLE) {
        this.angleDegrees -= FULL_CIRCLE;
      }

      const angleRadians = mathUtils.degreesToRadians(this.angleDegrees);

      const sine = Math.sin(angleRadians);
      const cosine = Math.cos(angleRadians);

      this.line.point2.moveTo([cosine, sine]);

      const roundedSine = mathUtils.roundTo2DecimalPlaces(sine);
      const roundedCosine = mathUtils.roundTo2DecimalPlaces(cosine);
      const roundedAngle = mathUtils.roundTo2DecimalPlaces(this.angleDegrees);

      this.printLog(formatLog(roundedSine, roundedCosine, roundedAngle));

      this.previousTimeStamp = timeStamp;

      requestAnimationFrame(this.animate);
    } catch (e) {
      console.error('Error during animation:', e);
    }
  };
}

export default StartPageMathRenderer;
