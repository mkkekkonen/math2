import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import JxgPoint from 'math/wrappers/jxgPoint';
import JxgScene from 'math/wrappers/jxgScene';
import { IPointFactory } from 'math/ioc/factories';
import { IScene, TYPES } from 'math/ioc/app';
import { IPoint, IPointOptions } from 'math/ioc/geometry';
import * as utils from 'math/utils';

@injectable()
export default class JxgPointFactory implements IPointFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createPoint = (
    coordinates: number[],
    pointOptions: IPointOptions = {},
    onDrag?: (e: Event) => void
  ): IPoint => {
    const pointAttributes = utils.getJxgPointOptions(pointOptions);
    return JxgPoint.initialize(
      this._scene as JxgScene,
      coordinates,
      pointAttributes,
      onDrag
    );
  };
}
