import { inject, injectable } from 'inversify';
import { getJxgPointOptions } from 'math/utils';
import JxgCircle from 'math/wrappers/jxgCircle';
import JxgScene from 'math/wrappers/jxgScene';
import { ICircleFactory, ICircleFactoryOptions } from 'math/ioc/factories';
import { IScene, TYPES } from 'math/ioc/app';

@injectable()
export default class JxgCircleFactory implements ICircleFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createCircle(options: ICircleFactoryOptions) {
    const { coordinates, circleOptions, pointOptions } = options;
    const pointAttributes = getJxgPointOptions(pointOptions);

    return JxgCircle.initialize(
      this._scene as JxgScene,
      coordinates,
      circleOptions,
      pointAttributes
    );
  }
}
