import { inject, injectable } from 'inversify';
import { IScene, TYPES } from 'math/ioc/app';
import { getJxgPointOptions } from 'math/utils';
import JxgLine from 'math/wrappers/jxgLine';
import JxgScene from 'math/wrappers/jxgScene';
import { ILineFactory, ILineFactoryOptions } from 'math/ioc/factories';

@injectable()
export default class LineFactory implements ILineFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createLine = (options: ILineFactoryOptions) => {
    if (this._scene instanceof JxgScene) {
      const { coordinates, lineOptions, pointOptions } = options;
      const pointAttributes = getJxgPointOptions(pointOptions);

      return JxgLine.initialize({
        scene: this._scene,
        points: coordinates,
        lineOptions,
        pointOptions: pointAttributes,
      });
    }
  };
}
