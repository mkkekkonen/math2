export default class Vector2 {
  private _x: number;
  private _y: number;

  constructor({ x, y }: { x?: number; y?: number } = {}) {
    this._x = x || 0;
    this._y = y || 0;
  }

  add = (v: Vector2) => {
    return new Vector2({
      x: this._x + v.x,
      y: this._y + v.y,
    });
  };

  subtract = (v: Vector2) => {
    return new Vector2({
      x: this._x - v.x,
      y: this._y - v.y,
    });
  };

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
