import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { degreesToRadians, roundTo2DecimalPlaces } from 'math/utils';
import {
  ICircle,
  ICircleFactory,
  ILineSegment,
  ILineSegmentFactory,
  IScene,
  ISlideMeasure,
  ISlideMeasureFactory,
  TYPES,
} from 'math/ioc';
import * as constants from 'math/constants';

import AbstractMathRenderer from './abstractMathRenderer';

const FULL_CIRCLE = 360;
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

  circle: ICircle;
  line: ILineSegment;
  sineMeasure: ISlideMeasure;
  cosineMeasure: ISlideMeasure;

  constructor(
    @inject(TYPES.FACTORIES.CIRCLE_FACTORY) circleFactory: ICircleFactory,
    @inject(TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory,
    @inject(TYPES.FACTORIES.SLIDE_MEASURE_FACTORY)
    slideMeasureFactory: ISlideMeasureFactory
  ) {
    super();

    this.line = lineSegmentFactory.createLineSegment({
      coordinates: [0, 0, 1, 0],
    });
    this.circle = circleFactory.createCircle({ coordinates: [0, 0, 1, 0] });
    this.sineMeasure = slideMeasureFactory.createSlideMeasure({
      lineSegmentCoordinates: [
        SLIDE_MEASURE_COORDINATE,
        -SLIDE_MEASURE_COORDINATE,
        SLIDE_MEASURE_COORDINATE,
        SLIDE_MEASURE_COORDINATE,
      ],
      pointCoordinates: [SLIDE_MEASURE_COORDINATE, 0],
    });
    this.cosineMeasure = slideMeasureFactory.createSlideMeasure({
      lineSegmentCoordinates: [
        -SLIDE_MEASURE_COORDINATE,
        -SLIDE_MEASURE_COORDINATE,
        SLIDE_MEASURE_COORDINATE,
        -SLIDE_MEASURE_COORDINATE,
      ],
      pointCoordinates: [0, -SLIDE_MEASURE_COORDINATE],
      endPointOptions: {
        fixed: true,
        withLabel: false,
        color: constants.COLORS.RED,
        size: 3,
      },
      pointOptions: {
        fixed: true,
        withLabel: false,
        color: constants.COLORS.RED,
        size: 4,
      },
      lineSegmentOptions: {
        fixed: true,
        color: constants.COLORS.RED,
      },
    });
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
