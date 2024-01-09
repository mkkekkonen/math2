import { ISceneOptions, IMathRenderer, TYPES } from 'math/ioc/app';
import container from 'math/ioc/container';

export default class SupplementaryAnglesEntry {
  initialize = () => {
    container.bind<ISceneOptions>(TYPES.BOARD_CONFIG).toConstantValue({
      axis: true,
      grid: true,
    });
    const start = container.get<IMathRenderer>(
      TYPES.MATH_RENDERER_TYPES.SUPPLEMENTARY_ANGLES
    );
    start.initialize();
  };
}
