import { inject, injectable } from 'inversify';

import { IScene, TYPES } from 'math/ioc/app';
import { ISlideControlFactoryOptions } from 'math/ioc/factories';
import JxgSlideControl from 'math/objects/jxgSlideControl';
import { getJxgPointOptions } from 'math/utils';
import JxgScene from 'math/wrappers/jxgScene';

@injectable()
export default class JxgSlideControlFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createSlideControl = (options: ISlideControlFactoryOptions) => {
    const {
      lineSegmentOptions,
      endPointOptions,
      controlPointOptions,
      coordinates,
    } = options;

    const endPointAttributes = getJxgPointOptions(endPointOptions);
    const controlPointAttributes = getJxgPointOptions(controlPointOptions);

    return JxgSlideControl.initialize(
      this._scene as JxgScene,
      coordinates,
      lineSegmentOptions,
      endPointAttributes,
      controlPointAttributes
    );
  };
}
