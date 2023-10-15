import JXG from 'jsxgraph';

import AbstractMathRenderer from './abstractMathRenderer';
import { degreesToRadians, roundTo2DecimalPlaces } from 'math/utils';
import Circle from 'math/objects/circle';
import SlideMeasure from 'math/objects/slideMeasure';

const FULL_CIRCLE = 360;

const formatLog = (sine: number, cosine: number, angle: number) =>
  `- sine: ${sine}
- cosine: ${cosine}
- angle: ${angle}
`;

class StartPageMathRenderer extends AbstractMathRenderer {
  _animatable = true;

  angle = 0;
  previousTimeStamp = 0;

  board: JXG.Board;
  line: JXG.Segment;

  circle: Circle;
  sineMeasure: SlideMeasure;
  cosineMeasure: SlideMeasure;

  override initialize = () => {
    this.board = JXG.JSXGraph.initBoard('graph', {
      boundingBox: [-1.5, 1.5, 1.5, -1.5],
      axis: true,
      grid: true,
    });

    this.circle = Circle.create(this.board, [0, 0, 1, 0]);
    this.line = this.board.create(
      'segment',
      [this.circle.point1, this.circle.point2],
      { color: '#555', fixed: true }
    );
    this.sineMeasure = SlideMeasure.create(
      this.board,
      [1.2, -1.2, 1.2, 1.2],
      [1.2, 0],
      { color: 'blue', size: 3, fixed: true, withLabel: false }
    );
    this.cosineMeasure = SlideMeasure.create(
      this.board,
      [-1.2, -1.2, 1.2, -1.2],
      [0, -1.2],
      { color: 'red', size: 3, fixed: true, withLabel: false }
    );

    requestAnimationFrame(this.animate);
  };

  override animate = (timeStamp: number) => {
    const delta = timeStamp - this.previousTimeStamp;

    this.angle += 0.1 * delta;
    if (this.angle > FULL_CIRCLE) {
      this.angle -= FULL_CIRCLE;
    }

    const angleRadians = degreesToRadians(this.angle);

    const sine = Math.sin(angleRadians);
    const cosine = Math.cos(angleRadians);

    this.circle.point2.moveTo([cosine, sine]);
    this.sineMeasure.update([1.2, sine]);
    this.cosineMeasure.update([cosine, -1.2]);

    const roundedSine = roundTo2DecimalPlaces(sine);
    const roundedCosine = roundTo2DecimalPlaces(cosine);
    const roundedAngle = roundTo2DecimalPlaces(this.angle);

    this.printLog(formatLog(roundedSine, roundedCosine, roundedAngle));

    this.previousTimeStamp = timeStamp;

    requestAnimationFrame(this.animate);
  };
}

export default StartPageMathRenderer;
