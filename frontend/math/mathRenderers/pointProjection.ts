import { inject, injectable } from 'inversify';

import Vector2 from 'math/math/vector2';
import { IScene, TYPES as APP_TYPES } from 'math/ioc/app';
import { ILine, ILineSegment, IPoint } from 'math/ioc/geometry';
import {
  TYPES as FACTORY_TYPES,
  ILineFactory,
  ILineSegmentFactory,
  IPointFactory,
} from 'math/ioc/factories';
import * as constants from 'math/constants';

import AbstractMathRenderer from './abstractMathRenderer';
import Line from 'math/math/line';

const BBOX_EXTENT = 10;

const FIXED_POINT_OPTIONS = {
  fixed: true,
  color: constants.COLORS.DARK_GRAY,
  withLabel: false,
  size: 1,
  layer: 1,
};

const LINE_OPTIONS = {
  color: constants.COLORS.DARK_GRAY,
  layer: 1,
};

const initializeFixedLine = (
  pointFactory: IPointFactory,
  lineFactory: ILineFactory
) => {
  const lineEquation = Line.fromAngle(20, -2);
  const x1 = -8;
  const x2 = 8;
  const y1 = lineEquation.getY(x1);
  const y2 = lineEquation.getY(x2);

  const point1 = pointFactory.createPoint([x1, y1], FIXED_POINT_OPTIONS);
  const point2 = pointFactory.createPoint([x2, y2], FIXED_POINT_OPTIONS);

  const line = lineFactory.createLineFromPoints({
    points: [point1, point2],
    lineOptions: LINE_OPTIONS,
  });

  return { lineEquation, line };
};

const initializeProjectionLine = (args: {
  fixedLineEquation: Line;
  point: IPoint;
  pointFactory: IPointFactory;
  lineSegmentFactory: ILineSegmentFactory;
}) => {
  const projectionLineSlope = -1 / args.fixedLineEquation.slope;

  const [x, y] = args.point.getCoordinates();
  const coordsPoint = new Vector2({ x, y });

  const lineEquation = Line.fromSlopeAndPoint(projectionLineSlope, coordsPoint);

  const intersection =
    args.fixedLineEquation.getIntersectionPoint(lineEquation);

  const projectedPoint = args.pointFactory.createPoint(
    [intersection.x, intersection.y],
    {
      ...FIXED_POINT_OPTIONS,
      color: constants.COLORS.RED,
      size: 2,
    }
  );

  const lineSegment = args.lineSegmentFactory.createLineSegmentFromPoints({
    points: [args.point, projectedPoint],
    lineSegmentOptions: { color: constants.COLORS.LIGHT_BLUE, dash: 2 },
  });

  return { projectedPoint, lineSegment };
};

const formatLog = (point1: Vector2, point2: Vector2) =>
  `Point coordinates: (${point1.x.toFixed(2)}, ${point1.y.toFixed(2)})
Projected point coordinates: (${point2.x.toFixed(2)}, ${point2.y.toFixed(2)})`;

@injectable()
export default class PointProjectionMathRenderer extends AbstractMathRenderer {
  point: IPoint;
  projectedPoint: IPoint;

  fixedLine: ILine;
  projectionLineSegment: ILineSegment;

  fixedLineEquation: Line;

  constructor(
    @inject(APP_TYPES.SCENE) scene: IScene,
    @inject(FACTORY_TYPES.FACTORIES.POINT_FACTORY) pointFactory: IPointFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_FACTORY) lineFactory: ILineFactory,
    @inject(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
    lineSegmentFactory: ILineSegmentFactory
  ) {
    super(scene);

    scene.initialize(BBOX_EXTENT);

    const printLog = () => {
      const [x, y] = this.point.getCoordinates();
      const [projX, projY] = this.projectedPoint.getCoordinates();

      this.printLog(
        formatLog(new Vector2({ x, y }), new Vector2({ x: projX, y: projY }))
      );
    };

    const updateProjection = () => {
      const projectionLineSlope = -1 / this.fixedLineEquation.slope;

      const [x, y] = this.point.getCoordinates();
      const coordsPoint = new Vector2({ x, y });

      const lineEquation = Line.fromSlopeAndPoint(
        projectionLineSlope,
        coordsPoint
      );

      const intersection =
        this.fixedLineEquation.getIntersectionPoint(lineEquation);

      this.projectedPoint.setLocation([intersection.x, intersection.y]);
    };

    const update = () => {
      updateProjection();
      printLog();
    };

    this.point = pointFactory.createPoint(
      [-3, 5],
      {
        color: constants.COLORS.LIGHT_BLUE,
      },
      update
    );

    const { lineEquation, line } = initializeFixedLine(
      pointFactory,
      lineFactory
    );

    this.fixedLineEquation = lineEquation;
    this.fixedLine = line;

    const { projectedPoint, lineSegment: projectionLineSegment } =
      initializeProjectionLine({
        fixedLineEquation: lineEquation,
        point: this.point,
        pointFactory,
        lineSegmentFactory,
      });

    this.projectedPoint = projectedPoint;
    this.projectionLineSegment = projectionLineSegment;

    printLog();
  }
}
