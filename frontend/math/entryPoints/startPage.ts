import container from 'math/ioc/container';
import { TYPES, ISceneOptions, IMathRenderer } from 'math/ioc/app';

export default class StartPageEntry {
  private _renderer: IMathRenderer;

  initialize = () => {
    container.bind<ISceneOptions>(TYPES.BOARD_CONFIG).toConstantValue({
      axis: true,
      grid: true,
    });
    this._renderer = container.get<IMathRenderer>(
      TYPES.MATH_RENDERER_TYPES.START_PAGE
    );
    this._renderer.initialize();
  };

  endAnimation = () => {
    this._renderer.endAnimation();
  };
}
