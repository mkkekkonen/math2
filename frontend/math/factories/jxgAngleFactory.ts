import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import {
  IAngleFactory,
  IAngleFactoryFromLinesOptions,
  IAngleFactoryFromPointsOptions,
  IAngleFactoryOptions,
} from 'math/ioc/factories';
import { IScene, TYPES } from 'math/ioc/app';
import JxgScene from 'math/wrappers/jxgScene';
import { getJxgPointOptions } from 'math/utils';
import JxgAngle from 'math/wrappers/jxgAngle';
import JxgPoint from 'math/wrappers/jxgPoint';
import { IAngle } from 'math/ioc/geometry';
import JxgLine from 'math/wrappers/jxgLine';

@injectable()
export default class JxgAngleFactory implements IAngleFactory {
  private _scene: IScene;

  constructor(@inject(TYPES.SCENE) scene: IScene) {
    this._scene = scene;
  }

  public createAngle = (options: IAngleFactoryOptions) => {
    const { coordinates, angleOptions, pointOptions } = options;
    const pointAttributes = getJxgPointOptions(pointOptions);

    return JxgAngle.initialize({
      scene: this._scene as JxgScene,
      points: coordinates,
      angleOptions,
      pointOptions: pointAttributes,
    });
  };

  public createAngleFromPoints = (options: IAngleFactoryFromPointsOptions) => {
    const { points, angleOptions } = options;
    const [point1, point2, point3] = points.map(
      (point) => (point as JxgPoint).point
    );

    return JxgAngle.initializeFromPoints({
      scene: this._scene as JxgScene,
      point1,
      point2,
      point3,
      angleOptions,
    });
  };

  public createAngleFromLines(options: IAngleFactoryFromLinesOptions): IAngle {
    const { lines, direction, angleOptions } = options;
    const [line1, line2] = lines;

    return JxgAngle.initializeFromLines({
      scene: this._scene as JxgScene,
      line1: (line1 as JxgLine).line,
      line2: (line2 as JxgLine).line,
      direction,
      angleOptions,
    });
  }
}
