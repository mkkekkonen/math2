import { inject, injectable } from 'inversify';
import { ICircleFactory, ICircleFactoryOptions, IScene, TYPES } from 'math/ioc';
import { getJxgPointOptions } from 'math/utils';
import JxgCircle from 'math/wrappers/jxgCircle';
import JxgScene from 'math/wrappers/jxgScene';

@injectable()
export default class CircleFactory implements ICircleFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createCircle(options: ICircleFactoryOptions) {
    if (this._scene instanceof JxgScene) {
      const { coordinates, circleOptions, pointOptions } = options;
      const { pointAttributes } = getJxgPointOptions(pointOptions);

      console.log(pointAttributes);

      return JxgCircle.initialize(
        this._scene,
        coordinates,
        circleOptions,
        pointAttributes
      );
    }
  }
}
