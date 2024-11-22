import { inject, injectable } from 'inversify';

import { IScene, TYPES } from 'math/ioc/app';
import {
  ISlideControlFactory,
  ISlideControlFactoryOptions,
} from 'math/ioc/factories';
import { ISlideControl } from 'math/ioc/objects';
import JxgSlideControl from 'math/objects/jxgSlideControl';
import { getJxgPointOptions } from 'math/utils';
import JxgScene from 'math/wrappers/jxgScene';

@injectable()
export default class JxgSlideControlFactory implements ISlideControlFactory {
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
      onDrag,
    } = options;

    const endPointAttributes = getJxgPointOptions(endPointOptions);
    const controlPointAttributes = getJxgPointOptions(controlPointOptions);

    return JxgSlideControl.initialize(
      this._scene as JxgScene,
      coordinates,
      lineSegmentOptions,
      endPointAttributes,
      controlPointAttributes,
      null,
      onDrag
    );
  };

  public createSlideControlFromExternalPoint(
    options: ISlideControlFactoryOptions
  ): ISlideControl {
    const {
      lineSegmentOptions,
      endPointOptions,
      controlPointOptions,
      externalControlPoint,
      coordinates,
      onDrag,
    } = options;

    const endPointAttributes = getJxgPointOptions(endPointOptions);

    return JxgSlideControl.initialize(
      this._scene as JxgScene,
      coordinates,
      lineSegmentOptions,
      endPointAttributes,
      null,
      externalControlPoint,
      onDrag
    );
  }
}
