import AbstractMathRenderer from 'math2/mathRenderers/abstractMathRenderer';
import PerpendicularBisectorMathRenderer from 'math2/mathRenderers/perpendicularBisector';

export default class PerpendicularBisectorEntry {
  private _renderer: AbstractMathRenderer;

  initialize = () => {
    this._renderer = new PerpendicularBisectorMathRenderer({
      axis: true,
      grid: true,
    });
    this._renderer.initialize();
  };

  endAnimation = () => {
    this._renderer.endAnimation();
  };
}
