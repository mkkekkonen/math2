import { injectable, inject, interfaces, Container } from 'inversify';
import 'reflect-metadata';

import JXG from 'jsxgraph';

import { degreesToRadians, roundTo2DecimalPlaces } from 'math/utils';
import SlideMeasure from 'math/objects/slideMeasure';
import { ICircle, ICircleFactory, IScene, TYPES } from 'math/ioc';

import AbstractMathRenderer from './abstractMathRenderer';

const FULL_CIRCLE = 360;
const BOUNDING_BOX_DIMENSION = 1.5;
const SLIDE_MEASURE_COORDINATE = 1.2;
const ANGLE_STEP = 0.1;

const formatLog = (sine: number, cosine: number, angle: number) =>
  `- sine: ${sine}
- cosine: ${cosine}
- angle: ${angle}
`;

@injectable()
class StartPageMathRenderer extends AbstractMathRenderer {
  _animatable = true;

  angle = 0;
  previousTimeStamp = 0;
  endAnimation = false;

  scene: IScene;
  line: JXG.Segment;

  circle: ICircle;
  sineMeasure: SlideMeasure;
  cosineMeasure: SlideMeasure;

  constructor(
    @inject(TYPES.FACTORIES.CIRCLE_FACTORY) circleFactory: ICircleFactory
  ) {
    super();

    this.circle = circleFactory.createCircle({ coordinates: [0, 0, 1, 0] });
  }

  override initialize = () => {
    // this.circle = Circle.create(this.board, [0, 0, 1, 0]);
    // this.line = this.board.create(
    //   'segment',
    //   [this.circle.point1, this.circle.point2],
    //   { color: constants.COLORS.DARK_GRAY, fixed: true }
    // );
    // this.sineMeasure = SlideMeasure.create(
    //   this.board,
    //   [
    //     SLIDE_MEASURE_COORDINATE,
    //     -SLIDE_MEASURE_COORDINATE,
    //     SLIDE_MEASURE_COORDINATE,
    //     SLIDE_MEASURE_COORDINATE,
    //   ],
    //   [SLIDE_MEASURE_COORDINATE, 0],
    //   { color: constants.COLORS.BLUE }
    // );
    // this.cosineMeasure = SlideMeasure.create(
    //   this.board,
    //   [
    //     -SLIDE_MEASURE_COORDINATE,
    //     -SLIDE_MEASURE_COORDINATE,
    //     SLIDE_MEASURE_COORDINATE,
    //     -SLIDE_MEASURE_COORDINATE,
    //   ],
    //   [0, -SLIDE_MEASURE_COORDINATE],
    //   { color: constants.COLORS.RED }
    // );
    // requestAnimationFrame(this.animate);
  };

  override animate = (timeStamp: number) => {
    if (this.endAnimation) {
      return;
    }

    try {
      const delta = timeStamp - this.previousTimeStamp;

      this.angle += ANGLE_STEP * delta;
      if (this.angle > FULL_CIRCLE) {
        this.angle -= FULL_CIRCLE;
      }

      const angleRadians = degreesToRadians(this.angle);

      const sine = Math.sin(angleRadians);
      const cosine = Math.cos(angleRadians);

      // this.circle.point2.moveTo([cosine, sine]);
      this.sineMeasure.update([SLIDE_MEASURE_COORDINATE, sine]);
      this.cosineMeasure.update([cosine, -SLIDE_MEASURE_COORDINATE]);

      const roundedSine = roundTo2DecimalPlaces(sine);
      const roundedCosine = roundTo2DecimalPlaces(cosine);
      const roundedAngle = roundTo2DecimalPlaces(this.angle);

      this.printLog(formatLog(roundedSine, roundedCosine, roundedAngle));

      this.previousTimeStamp = timeStamp;

      requestAnimationFrame(this.animate);
    } catch {
      // no-op
    }
  };
}

export default StartPageMathRenderer;
