import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { IScene, TYPES } from 'math/ioc/app';
import { getJxgPointOptions } from 'math/utils';
import JxgLineSegment from 'math/wrappers/jxgLineSegment';
import JxgScene from 'math/wrappers/jxgScene';
import {
  ILineSegmentFactory,
  ILineSegmentFactoryFromPointsOptions,
  ILineSegmentFactoryOptions,
} from 'math/ioc/factories';
import JxgPoint from 'math/wrappers/jxgPoint';

@injectable()
export default class JxgLineSegmentFactory implements ILineSegmentFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createLineSegment = (options: ILineSegmentFactoryOptions) => {
    const { coordinates, lineSegmentOptions, pointOptions, onPointDrag } =
      options;
    const pointAttributes = getJxgPointOptions(pointOptions);

    return JxgLineSegment.initialize({
      scene: this._scene as JxgScene,
      points: coordinates,
      lineSegmentOptions,
      pointOptions: pointAttributes,
      onPointDrag,
    });
  };

  public createLineSegmentFromPoints = (
    options: ILineSegmentFactoryFromPointsOptions
  ) => {
    const { points, lineSegmentOptions } = options;
    const jxgPoints = points.map((point) => (point as JxgPoint).point);

    return JxgLineSegment.initializeFromPoints({
      scene: this._scene as JxgScene,
      points: jxgPoints,
      lineSegmentOptions,
    });
  };
}
