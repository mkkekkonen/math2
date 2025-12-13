import AbstractMathRenderer from 'math2/mathRenderers/abstractMathRenderer';
import AngleClassificationMathRenderer from 'math2/mathRenderers/angleClassification';

export default class AngleClassificationEntry {
  private _renderer: AbstractMathRenderer;

  initialize = () => {
    this._renderer = new AngleClassificationMathRenderer({
      axis: true,
      grid: true,
    });
    this._renderer.initialize();
  };

  endAnimation = () => {
    this._renderer.endAnimation();
  };
}
