import { inject, injectable } from 'inversify';
import { getJxgPointOptions } from 'math/utils';
import JxgPoint from 'math/wrappers/jxgPoint';
import JxgScene from 'math/wrappers/jxgScene';
import { IPointFactory } from 'math/ioc/factories';
import { IScene, TYPES } from 'math/ioc/app';
import { IPointOptions, IPoint } from 'math/ioc/geometry';

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
