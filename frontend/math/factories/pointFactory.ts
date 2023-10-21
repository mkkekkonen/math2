import { inject, injectable } from 'inversify';
import { IPoint, IPointFactory, IPointOptions, IScene, TYPES } from 'math/ioc';
import { getJxgPointOptions } from 'math/utils';
import JxgPoint from 'math/wrappers/jxgPoint';
import JxgScene from 'math/wrappers/jxgScene';

@injectable()
export default class PointFactory implements IPointFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createPoint = (options: IPointOptions): IPoint => {
    if (this._scene instanceof JxgScene) {
      const { coordinates, pointAttributes } = getJxgPointOptions(options);
      return JxgPoint.initialize(this._scene, coordinates, pointAttributes);
    }
  };
}
