import { inject, injectable } from 'inversify';
import {
  ILineSegmentFactory,
  ILineSegmentFactoryOptions,
  IScene,
  TYPES,
} from 'math/ioc';
import { getJxgPointOptions } from 'math/utils';
import JxgLineSegment from 'math/wrappers/jxgLineSegment';
import JxgScene from 'math/wrappers/jxgScene';

@injectable()
export default class LineSegmentFactory implements ILineSegmentFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createLineSegment(options: ILineSegmentFactoryOptions) {
    if (this._scene instanceof JxgScene) {
      const { coordinates, lineSegmentOptions, pointOptions } = options;
      const { pointAttributes } = getJxgPointOptions(pointOptions);

      return JxgLineSegment.initialize(
        this._scene,
        coordinates,
        lineSegmentOptions,
        pointAttributes
      );
    }
  }
}
