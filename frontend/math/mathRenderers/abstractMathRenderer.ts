import { injectable } from 'inversify';
import { IScene, IMathRenderer } from 'math/ioc/app';

@injectable()
abstract class AbstractMathRenderer implements IMathRenderer {
  protected _animatable = false;
  protected _animationRunning = true;

  protected _scene: IScene;

  public constructor(scene: IScene) {
    this._scene = scene;
  }

  public get animatable() {
    return this._animatable;
  }

  public initialize = () => {};

  public animate = (_: number) => {
    if (!this.animatable) {
      return;
    }
  };

  public printLog = (log: string) => {
    document.getElementById('log').innerText = log;
  };

  public endAnimation = () => {
    this._animationRunning = false;
    this._scene.destroy();
  };
}

export default AbstractMathRenderer;
