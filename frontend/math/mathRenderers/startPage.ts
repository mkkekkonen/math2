import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { degreesToRadians, roundTo2DecimalPlaces } from 'math/utils';
import {
  ICircle,
  ICircleFactory,
  ILineSegment,
  ILineSegmentFactory,
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
      vertical: true,
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
      vertical: false,
    });

    requestAnimationFrame(this.animate);
  }

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

      this.line.setLocation([0, 0], [cosine, sine]);
      this.sineMeasure.updateValue(sine);
      this.cosineMeasure.updateValue(cosine);

      const roundedSine = roundTo2DecimalPlaces(sine);
      const roundedCosine = roundTo2DecimalPlaces(cosine);
      const roundedAngle = roundTo2DecimalPlaces(this.angle);

      this.printLog(formatLog(roundedSine, roundedCosine, roundedAngle));

      this.previousTimeStamp = timeStamp;

      requestAnimationFrame(this.animate);
    } catch (e) {
      console.error(e);
    }
  };
}

export default StartPageMathRenderer;
