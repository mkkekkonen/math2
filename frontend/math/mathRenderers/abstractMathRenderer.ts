import { injectable } from 'inversify';
import { IMathRenderer } from 'math/ioc';

@injectable()
abstract class AbstractMathRenderer implements IMathRenderer {
  protected _animatable = false;

  public get animatable() {
    return this._animatable;
  }

  public initialize = () => {};

  public animate = (timeStamp: number) => {
    if (!this.animatable) {
      return;
    }
  };

  public printLog = (log: string) => {
    document.getElementById('log').innerText = log;
  };
}

export default AbstractMathRenderer;
