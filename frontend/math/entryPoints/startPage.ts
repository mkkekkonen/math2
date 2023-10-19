import { IMathRenderer, IScene, ISceneOptions, TYPES } from 'math/ioc';
import container from 'math/ioc/container';
import JxgScene from 'math/wrappers/jxgScene';

const BOUNDING_BOX_DIMENSION = 1.5;

export default class StartPageEntry {
  initialize = () => {
    container.bind<ISceneOptions>(TYPES.BOARD_CONFIG).toConstantValue({
      bboxExtent: BOUNDING_BOX_DIMENSION,
      axis: true,
      grid: true,
    });
    container.rebind(TYPES.SCENE).to(JxgScene);
    const start = container.get<IMathRenderer>(
      TYPES.ENTRY_POINT_TYPES.StartPage
    );
    start.initialize();
  };
}
