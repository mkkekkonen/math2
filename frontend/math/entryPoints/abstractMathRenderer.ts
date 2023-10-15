abstract class AbstractMathRenderer {
  protected _animatable = false;

  public get animatable() {
    return this._animatable;
  }

  public initialize = () => {};

  public render = () => {};

  public animate = (timeStamp: number) => {
    if (!this.animatable) {
      return;
    }
  };

  protected printLog = (log: string) => {
    document.getElementById('log').innerText = log;
  };
}

export default AbstractMathRenderer;
