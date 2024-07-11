import { inject, injectable } from 'inversify';
import { IScene, TYPES } from 'math/ioc/app';
import { getJxgPointOptions } from 'math/utils';
import JxgLine from 'math/wrappers/jxgLine';
import JxgScene from 'math/wrappers/jxgScene';
import {
  ILineFactory,
  ILineFactoryFromPointsOptions,
  ILineFactoryOptions,
} from 'math/ioc/factories';
import { ILine } from 'math/ioc/geometry';
import JxgPoint from 'math/wrappers/jxgPoint';

@injectable()
export default class JxgLineFactory implements ILineFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createLine = (options: ILineFactoryOptions) => {
    const { coordinates, lineOptions, pointOptions } = options;
    const pointAttributes = getJxgPointOptions(pointOptions);

    return JxgLine.initialize({
      scene: this._scene as JxgScene,
      points: coordinates,
      lineOptions,
      pointOptions: pointAttributes,
    });
  };

  public createLineFromPoints(options: ILineFactoryFromPointsOptions): ILine {
    const { points, lineOptions } = options;
    const jxgPoints = points.map((point) => (point as JxgPoint).point);

    return JxgLine.initializeFromPoints({
      scene: this._scene as JxgScene,
      points: jxgPoints,
      lineOptions,
    });
  }
}
