import { ILineFactory, IPointFactory } from 'math/ioc/factories';
import Line from 'math/math/line';
import * as constants from 'math/constants';

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

export const initializeFixedLine = (
  pointFactory: IPointFactory,
  lineFactory: ILineFactory,
  angle: number,
  yIntercept: number
) => {
  const lineEquation = Line.fromAngle(angle, yIntercept);
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
