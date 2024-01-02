import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import * as mathUtils from 'math/mathUtils';
import * as constants from 'math/constants';
import { ICircle, ILineSegment } from 'math/ioc/geometry';
import { ISlideMeasure } from 'math/ioc/objects';
import {
  ICircleFactory,
  ILineSegmentFactory,
  ISlideMeasureFactory,
  TYPES as FACTORY_TYPES,
} from 'math/ioc/factories';
import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';

import AbstractMathRenderer from './abstractMathRenderer';

const FULL_CIRCLE = 360;
const SLIDE_MEASURE_COORDINATE = 1.2;
const ANGLE_STEP = 0.1;
const BBOX_EXTENT = 1.5;

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

  circle: ICircle;
  line: ILineSegment;
  sineMeasure: ISlideMeasure;
  cosineMeasure: ISlideMeasure;

  constructor(
    @inject(FACTORY_TYPES.FACTORIES.CIRCLE_FACTORY)
    circleFactory: ICircleFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory,
    @inject(FACTORY_TYPES.FACTORIES.SLIDE_MEASURE_FACTORY)
    slideMeasureFactory: ISlideMeasureFactory,
    @inject(APP_TYPES.SCENE) scene: IScene
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

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
    if (!this._animationRunning) {
      return;
    }

    try {
      const delta = timeStamp - this.previousTimeStamp;

      this.angle += ANGLE_STEP * delta;
      if (this.angle > FULL_CIRCLE) {
        this.angle -= FULL_CIRCLE;
      }

      const angleRadians = mathUtils.degreesToRadians(this.angle);

      const sine = Math.sin(angleRadians);
      const cosine = Math.cos(angleRadians);

      this.line.setLocation([0, 0], [cosine, sine]);
      this.sineMeasure.updateValue(sine);
      this.cosineMeasure.updateValue(cosine);

      const roundedSine = mathUtils.roundTo2DecimalPlaces(sine);
      const roundedCosine = mathUtils.roundTo2DecimalPlaces(cosine);
      const roundedAngle = mathUtils.roundTo2DecimalPlaces(this.angle);

      this.printLog(formatLog(roundedSine, roundedCosine, roundedAngle));

      this.previousTimeStamp = timeStamp;

      requestAnimationFrame(this.animate);
    } catch (e) {
      console.error(e);
    }
  };
}

export default StartPageMathRenderer;
