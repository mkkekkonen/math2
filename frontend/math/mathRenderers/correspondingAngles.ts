import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  IAngleFactory,
  ILineFactory,
  IPointFactory,
  ISlideControlFactory,
} from 'math/ioc/factories';
import { IAngle, ILine, ILineSegment, IPoint } from 'math/ioc/geometry';
import * as constants from 'math/constants';
import * as mathUtils from 'math/mathUtils';

import AbstractMathRenderer from './abstractMathRenderer';
import { ISlideControl } from 'math/ioc/objects';

const BBOX_EXTENT = 10;

const FIXED_POINT_OPTIONS = {
  fixed: true,
  color: constants.COLORS.DARK_GRAY,
  withLabel: false,
  size: 3,
};

const SLIDE_CONTROL_POINT_OPTIONS = {
  fixed: false,
  color: constants.COLORS.LIGHT_BLUE,
  withLabel: false,
  size: 4,
};

const ANGLE_OPTIONS = {
  strokeColor: constants.COLORS.BLUE,
  fillColor: constants.COLORS.LIGHT_BLUE,
};

const formatLog = (alpha: number, beta: number) =>
  `α: ${alpha}°
β: ${beta}°`;

const logAngles = (alpha: number, beta: number) => {
  const roundedAlpha = Math.round(alpha);
  const roundedBeta = Math.round(beta);

  return formatLog(roundedAlpha, roundedBeta);
};

@injectable()
export default class CorrespondingAnglesMathRenderer extends AbstractMathRenderer {
  firstLinePoint1: IPoint;
  firstLinePoint2: IPoint;

  secondLinePoint1: IPoint;
  secondLinePoint2: IPoint;

  middleLine: ILine;
  lineSegment1: ILineSegment;
  lineSegment2: ILineSegment;

  angle1: IAngle;
  angle2: IAngle;

  firstLineSlideControl: ISlideControl;
  secondLineSlideControl: ISlideControl;

  constructor(
    @inject(APP_TYPES.SCENE) scene: IScene,
    @inject(FACTORY_TYPES.FACTORIES.ANGLE_FACTORY) angleFactory: IAngleFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_FACTORY) lineFactory: ILineFactory,
    @inject(FACTORY_TYPES.FACTORIES.POINT_FACTORY) pointFactory: IPointFactory,
    @inject(FACTORY_TYPES.FACTORIES.SLIDE_CONTROL_FACTORY)
    slideControlFactory: ISlideControlFactory
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    this.middleLine = lineFactory.createLine({
      coordinates: [-5, 10, 5, -10],
      lineOptions: {
        color: constants.COLORS.DARK_GRAY,
      },
      pointOptions: FIXED_POINT_OPTIONS,
    });

    this.firstLineSlideControl = slideControlFactory.createSlideControl({
      coordinates: [7, 7, 7, -6],
      lineSegmentOptions: {
        color: constants.COLORS.BLUE,
      },
      endPointOptions: { ...FIXED_POINT_OPTIONS, color: constants.COLORS.BLUE },
      controlPointOptions: SLIDE_CONTROL_POINT_OPTIONS,
    });

    this.secondLineSlideControl = slideControlFactory.createSlideControl({
      coordinates: [-7, -7, -7, 6],
      lineSegmentOptions: {
        color: constants.COLORS.ORANGE,
      },
      endPointOptions: {
        ...FIXED_POINT_OPTIONS,
        color: constants.COLORS.ORANGE,
      },
      controlPointOptions: {
        ...SLIDE_CONTROL_POINT_OPTIONS,
        color: constants.COLORS.LIGHT_ORANGE,
      },
    });
  }
}
