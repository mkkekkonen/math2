import { inject, injectable } from 'inversify';

import * as constants from 'math/constants';
import { IAngle, ILine, IPoint } from 'math/ioc/geometry';
import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  IAngleFactory,
  ILineFactory,
  IPointFactory,
} from 'math/ioc/factories';

import AbstractMathRenderer from './abstractMathRenderer';

const BBOX_EXTENT = 10;

const FIXED_POINT_OPTIONS = {
  fixed: true,
  color: constants.COLORS.DARK_GRAY,
  withLabel: false,
  size: 1,
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

@injectable()
export default class CorrespondingAngles2MathRenderer extends AbstractMathRenderer {
  middleLineStartPoint: IPoint;
  middleLineEndPoint: IPoint;

  middleLine: ILine;
  line1: ILine;
  line2: ILine;

  angle1: IAngle;
  angle2: IAngle;

  constructor(
    @inject(APP_TYPES.SCENE) scene: IScene,
    @inject(FACTORY_TYPES.FACTORIES.POINT_FACTORY) pointFactory: IPointFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_FACTORY) lineFactory: ILineFactory,
    @inject(FACTORY_TYPES.FACTORIES.ANGLE_FACTORY) angleFactory: IAngleFactory
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    this.line1 = lineFactory.createLine({
      coordinates: [-5, 4, 5, 4],
      lineOptions: { color: constants.COLORS.DARK_GRAY },
      pointOptions: FIXED_POINT_OPTIONS,
    });

    this.line2 = lineFactory.createLine({
      coordinates: [-5, -4, 5, -4],
      lineOptions: { color: constants.COLORS.DARK_GRAY },
      pointOptions: FIXED_POINT_OPTIONS,
    });

    this.middleLineStartPoint = pointFactory.createPoint(
      [-3, 8],
      SLIDE_CONTROL_POINT_OPTIONS
    );
    this.middleLineEndPoint = pointFactory.createPoint(
      [3, -8],
      SLIDE_CONTROL_POINT_OPTIONS
    );

    this.middleLine = lineFactory.createLineFromPoints({
      points: [this.middleLineStartPoint, this.middleLineEndPoint],
      lineOptions: LINE_OPTIONS,
    });

    this.angle1 = angleFactory.createAngleFromLines({
      lines: [this.middleLine, this.line1],
      direction: [-1, -1],
      angleOptions: ANGLE_OPTIONS,
    });

    this.angle2 = angleFactory.createAngleFromLines({
      lines: [this.middleLine, this.line2],
      direction: [-1, -1],
      angleOptions: {
        ...ANGLE_OPTIONS,
        strokeColor: constants.COLORS.ORANGE,
        fillColor: constants.COLORS.LIGHT_ORANGE,
      },
    });
  }
}
