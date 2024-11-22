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
  layer: 1,
};

const SLIDE_CONTROL_POINT_OPTIONS = {
  fixed: false,
  color: constants.COLORS.RED,
  withLabel: false,
  size: 4,
  layer: 2,
};

const LINE_OPTIONS = {
  color: constants.COLORS.BLUE,
  layer: 1,
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
  firstLineEndPoint: IPoint;
  firstLineControlPoint: IPoint;

  secondLineEndPoint: IPoint;
  secondLineControlPoint: IPoint;

  middleLine: ILine;
  line1: ILine;
  line2: ILine;

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

    const printLog = () => {
      const alpha = this.angle1.getAngle();
      const beta = this.angle2.getAngle();

      this.printLog(logAngles(alpha, beta));
    };

    this.middleLine = lineFactory.createLine({
      coordinates: [-5, 10, 5, -10],
      lineOptions: {
        color: constants.COLORS.DARK_GRAY,
      },
      pointOptions: FIXED_POINT_OPTIONS,
    });

    this.firstLineEndPoint = pointFactory.createPoint([-7, 5], {
      ...FIXED_POINT_OPTIONS,
      color: constants.COLORS.BLUE,
    });
    this.firstLineControlPoint = pointFactory.createPoint(
      [7, 5],
      SLIDE_CONTROL_POINT_OPTIONS
    );

    this.secondLineEndPoint = pointFactory.createPoint([7, -5], {
      ...FIXED_POINT_OPTIONS,
      color: constants.COLORS.ORANGE,
    });
    this.secondLineControlPoint = pointFactory.createPoint(
      [-7, -5],
      SLIDE_CONTROL_POINT_OPTIONS
    );

    this.firstLineSlideControl =
      slideControlFactory.createSlideControlFromExternalPoint({
        coordinates: [7, 5, 7, -3],
        lineSegmentOptions: LINE_OPTIONS,
        endPointOptions: {
          ...FIXED_POINT_OPTIONS,
          color: constants.COLORS.BLUE,
        },
        externalControlPoint: this.firstLineControlPoint,
        onDrag: printLog,
      });

    this.secondLineSlideControl =
      slideControlFactory.createSlideControlFromExternalPoint({
        coordinates: [-7, -5, -7, 3],
        lineSegmentOptions: {
          ...LINE_OPTIONS,
          color: constants.COLORS.ORANGE,
        },
        endPointOptions: {
          ...FIXED_POINT_OPTIONS,
          color: constants.COLORS.ORANGE,
        },
        externalControlPoint: this.secondLineControlPoint,
        onDrag: printLog,
      });

    this.line1 = lineFactory.createLineFromPoints({
      points: [this.firstLineEndPoint, this.firstLineControlPoint],
      lineOptions: LINE_OPTIONS,
    });

    this.line2 = lineFactory.createLineFromPoints({
      points: [this.secondLineEndPoint, this.secondLineControlPoint],
      lineOptions: {
        ...LINE_OPTIONS,
        color: constants.COLORS.ORANGE,
      },
    });

    this.angle1 = angleFactory.createAngleFromLines({
      lines: [this.line1, this.middleLine],
      direction: [1, -1],
      angleOptions: ANGLE_OPTIONS,
    });

    this.angle2 = angleFactory.createAngleFromLines({
      lines: [this.line2, this.middleLine],
      direction: [-1, -1],
      angleOptions: {
        ...ANGLE_OPTIONS,
        strokeColor: constants.COLORS.ORANGE,
        fillColor: constants.COLORS.LIGHT_ORANGE,
      },
    });

    printLog();
  }
}
