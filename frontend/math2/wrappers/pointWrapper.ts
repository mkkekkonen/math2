class PointWrapper {
  private _point: JXG.Point;

  constructor(
    board: JXG.Board,
    points: number[],
    options: JXG.PointAttributes,
    onDrag?: (e: Event) => void
  ) {
    this._point = board.create('point', points, options);

    if (onDrag) {
      this._point.on('drag', onDrag);
    }
  }

  public get point() {
    return this._point;
  }

  public setLocation(coordinates: number[]) {
    this._point.moveTo(coordinates);
  }

  public getCoordinates(): number[] {
    return [this._point.X(), this._point.Y()];
  }
}

export default PointWrapper;
