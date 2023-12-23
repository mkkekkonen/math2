import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { IScene, TYPES } from 'math/ioc/app';
import { getJxgPointOptions } from 'math/utils';
import JxgLineSegment from 'math/wrappers/jxgLineSegment';
import JxgScene from 'math/wrappers/jxgScene';
import {
  ILineSegmentFactory,
  ILineSegmentFactoryOptions,
} from 'math/ioc/factories';

@injectable()
export default class LineSegmentFactory implements ILineSegmentFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createLineSegment = (options: ILineSegmentFactoryOptions) => {
    if (this._scene instanceof JxgScene) {
      const { coordinates, lineSegmentOptions, pointOptions, onPointDrag } =
        options;
      const { pointAttributes } = getJxgPointOptions(pointOptions);

      return JxgLineSegment.initialize({
        scene: this._scene,
        points: coordinates,
        lineSegmentOptions,
        pointOptions: pointAttributes,
        onPointDrag,
      });
    }
  };
}
