import { IMathRenderer, IScene, ISceneOptions, TYPES } from 'math/ioc';
import container from 'math/ioc/container';

const BOUNDING_BOX_EXTENT = 1.5;

export default class StartPageEntry {
  initialize = () => {
    container.bind<ISceneOptions>(TYPES.BOARD_CONFIG).toConstantValue({
      bboxExtent: BOUNDING_BOX_EXTENT,
      axis: true,
      grid: true,
    });
    const start = container.get<IMathRenderer>(
      TYPES.ENTRY_POINT_TYPES.StartPage
    );
    start.initialize();
  };
}
