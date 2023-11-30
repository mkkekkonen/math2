import { LineAttributes, PointAttributes } from 'jsxgraph';

import { ILine } from 'math/ioc/geometry';
import * as constants from 'math/constants';

import JxgScene from './jxgScene';

const defaultLineOptions: LineAttributes = {
  color: constants.COLORS.LIGHT_GRAY,
};

export default class JxgLine implements ILine {
  _point1: JXG.Point;
  _point2: JXG.Point;
  _line: JXG.Line;

  constructor(point1: JXG.Point, point2: JXG.Point, line: JXG.Line) {
    this._point1 = point1;
    this._point2 = point2;
    this._line = line;
  }

  setLocation = (
    startPointCoordinates: number[],
    endPointCoordinates: number[]
  ) => {
    this._point1.moveTo(startPointCoordinates);
    this._point2.moveTo(endPointCoordinates);
  };

  static initialize = ({
    scene,
    points,
    lineOptions = defaultLineOptions,
    pointOptions,
  }: {
    scene: JxgScene;
    points: number[];
    lineOptions: LineAttributes;
    pointOptions?: PointAttributes;
  }) => {
    const [x1, y1, x2, y2] = points;

    const point1 = scene.board.create('point', [x1, y1], pointOptions);
    const point2 = scene.board.create('point', [x2, y2], pointOptions);
    const line = scene.board.create('line', [point1, point2], lineOptions);

    return new JxgLine(point1, point2, line);
  };
}
