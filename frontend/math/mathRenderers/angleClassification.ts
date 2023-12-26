import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  IAngleFactory,
  ILineSegmentFactory,
  IPointFactory,
} from 'math/ioc/factories';
import { IAngle, ILineSegment, IPoint } from 'math/ioc/geometry';
import * as constants from 'math/constants';
import * as utils from 'math/utils';

import AbstractMathRenderer from './abstractMathRenderer';

const BBOX_EXTENT = 10;
const ANGLE_EXTENT = 8;

const FIXED_POINT_OPTIONS = {
  fixed: true,
  color: constants.COLORS.DARK_GRAY,
  withLabel: false,
};

const formatLog = (angle: number, description: string) =>
  `kulma/angle: ${angle}°
~ ${description}`;

const getAngleDescription = (angle: number) => {
  if (angle === 0) {
    return 'nollakulma / zero angle';
  }
  if (angle < 90) {
    return 'terävä kulma / acute angle';
  }
  if (angle === 90) {
    return 'suora kulma / right angle';
  }
  if (angle < 180) {
    return 'tylppä kulma / obtuse angle';
  }
  if (angle === 180) {
    return 'oikokulma / straight angle';
  }
  if (angle < 360) {
    return 'kupera kulma / reflex angle';
  }
  if (angle === 360) {
    return 'täysi kulma / complete angle';
  }

  return 'ei määritelty / not defined';
};

const logAngle = (angle: number) => {
  const angleRounded = Math.round(angle);
  const description = getAngleDescription(angleRounded);

  return formatLog(angleRounded, description);
};

@injectable()
export default class AngleClassificationMathRenderer extends AbstractMathRenderer {
  point1: IPoint;
  point2: IPoint;
  point3: IPoint;
  lineSegment: ILineSegment;
  angle: IAngle;

  constructor(
    @inject(FACTORY_TYPES.FACTORIES.POINT_FACTORY) pointFactory: IPointFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory,
    @inject(FACTORY_TYPES.FACTORIES.ANGLE_FACTORY) angleFactory: IAngleFactory,
    @inject(APP_TYPES.SCENE) scene: IScene
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    const getAndLogAngle = () => {
      const [x, y] = this.point3.getCoordinates();

      const angle = Math.atan2(y, x);

      const positiveAngle = angle < 0 ? angle + 2 * Math.PI : angle;
      const angleDegrees = utils.radiansToDegrees(positiveAngle);
      this.printLog(logAngle(angleDegrees));

      return angle;
    };

    const onPointDrag = () => {
      const angle = getAndLogAngle();

      const newX = ANGLE_EXTENT * Math.cos(angle);
      const newY = ANGLE_EXTENT * Math.sin(angle);

      this.point3.setLocation([newX, newY]);
    };

    this.point1 = pointFactory.createPoint(
      [ANGLE_EXTENT, 0],
      FIXED_POINT_OPTIONS
    );
    this.point2 = pointFactory.createPoint([0, 0], FIXED_POINT_OPTIONS);
    this.point3 = pointFactory.createPoint(
      [0, ANGLE_EXTENT],
      { color: constants.COLORS.LIGHT_BLUE },
      onPointDrag
    );

    this.lineSegment = lineSegmentFactory.createLineSegmentFromPoints({
      points: [this.point2, this.point3],
    });

    this.angle = angleFactory.createAngleFromPoints({
      points: [this.point1, this.point2, this.point3],
      angleOptions: {
        strokeColor: constants.COLORS.BLUE,
        fillColor: constants.COLORS.LIGHT_BLUE,
      },
    });

    getAndLogAngle();
  }
}
