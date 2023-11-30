import JXG from 'jsxgraph';
import { IPoint } from 'math/ioc/geometry';

import JxgScene from './jxgScene';

class JxgPoint implements IPoint {
  _point: JXG.Point;

  constructor(point: JXG.Point) {
    this._point = point;
  }

  static initialize = (
    scene: JxgScene,
    coordinates: number[],
    options: JXG.PointAttributes
  ) => new JxgPoint(scene.board.create('point', coordinates, options));
}

export default JxgPoint;
