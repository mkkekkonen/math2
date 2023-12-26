import { inject, injectable } from 'inversify';

import SlideMeasure from 'math/objects/slideMeasure';
import { getJxgPointOptions } from 'math/utils';
import JxgScene from 'math/wrappers/jxgScene';
import { IScene, TYPES } from 'math/ioc/app';
import {
  ISlideMeasureFactory,
  ISlideMeasureFactoryOptions,
} from 'math/ioc/factories';

@injectable()
export default class JxgSlideMeasureFactory implements ISlideMeasureFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createSlideMeasure = (options: ISlideMeasureFactoryOptions) => {
    const {
      lineSegmentCoordinates,
      pointCoordinates,
      lineSegmentOptions,
      endPointOptions,
      pointOptions,
      vertical,
    } = options;

    const endPointAttributes = getJxgPointOptions(endPointOptions);
    const pointAttributes = getJxgPointOptions(pointOptions);

    return SlideMeasure.initialize(
      this._scene as JxgScene,
      lineSegmentCoordinates,
      pointCoordinates,
      vertical,
      lineSegmentOptions,
      pointAttributes,
      endPointAttributes
    );
  };
}
