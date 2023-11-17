import { IMathRenderer, ISceneOptions, TYPES } from 'math/ioc';
import container from 'math/ioc/container';

export default class StartPageEntry {
  private _renderer: IMathRenderer;

  initialize = () => {
    container.bind<ISceneOptions>(TYPES.BOARD_CONFIG).toConstantValue({
      axis: true,
      grid: true,
    });
    this._renderer = container.get<IMathRenderer>(
      TYPES.ENTRY_POINT_TYPES.START_PAGE
    );
    this._renderer.initialize();
  };

  endAnimation = () => {
    this._renderer.endAnimation();
  };
}
