import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { IAngleFactory, IAngleFactoryOptions } from 'math/ioc/factories';
import { IScene, TYPES } from 'math/ioc/app';
import JxgScene from 'math/wrappers/jxgScene';
import { getJxgPointOptions } from 'math/utils';
import JxgAngle from 'math/wrappers/jxgAngle';

@injectable()
export default class AngleFactory implements IAngleFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createAngle = (options: IAngleFactoryOptions) => {
    if (this._scene instanceof JxgScene) {
      const { coordinates, angleOptions, pointOptions } = options;
      const { pointAttributes } = getJxgPointOptions(pointOptions);

      return JxgAngle.initialize({
        scene: this._scene,
        points: coordinates,
        angleOptions,
        pointOptions: pointAttributes,
      });
    }
  };
}
