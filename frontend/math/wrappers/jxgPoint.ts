import JXG from 'jsxgraph';
import { IPoint } from 'math/ioc/geometry';

import JxgScene from './jxgScene';

class JxgPoint implements IPoint {
  _point: JXG.Point;

  constructor(point: JXG.Point) {
    this._point = point;
  }

  public get point() {
    return this._point;
  }

  public getCoordinates(): number[] {
    return [this._point.X(), this._point.Y()];
  }

  public setLocation(coordinates: number[]) {
    this._point.moveTo(coordinates);
  }

  static initialize = (
    scene: JxgScene,
    coordinates: number[],
    options: JXG.PointAttributes,
    onDrag?: (e: Event) => void
  ) => {
    const point = scene.board.create('point', coordinates, options);

    if (onDrag) {
      point.on('drag', onDrag);
    }

    return new JxgPoint(point);
  };
}

export default JxgPoint;
