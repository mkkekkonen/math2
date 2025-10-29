import AbstractMathRenderer from 'math2/mathRenderers/abstractMathRenderer';
import StartPageMathRenderer from 'math2/mathRenderers/startPage';

export default class StartPageEntry {
  private _renderer: AbstractMathRenderer;

  initialize = () => {
    this._renderer = new StartPageMathRenderer({ axis: true, grid: true });
    this._renderer.initialize();
  };

  endAnimation = () => {
    this._renderer.endAnimation();
  };
}
