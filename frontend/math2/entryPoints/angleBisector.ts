import AbstractMathRenderer from 'math2/mathRenderers/abstractMathRenderer';
import AngleBisectorMathRenderer from 'math2/mathRenderers/angleBisector';

export default class AngleBisectorEntry {
  private _renderer: AbstractMathRenderer;

  initialize = () => {
    this._renderer = new AngleBisectorMathRenderer({
      axis: true,
      grid: true,
    });
    this._renderer.initialize();
  };

  endAnimation = () => {
    this._renderer.endAnimation();
  };
}
