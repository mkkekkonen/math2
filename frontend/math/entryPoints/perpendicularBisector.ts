import { IMathRenderer, ISceneOptions, TYPES } from 'math/ioc';
import container from 'math/ioc/container';

const BOUNDING_BOX_EXTENT = 10;

export default class PerpendicularBisectorEntry {
  initialize = () => {
    container.bind<ISceneOptions>(TYPES.BOARD_CONFIG).toConstantValue({
      bboxExtent: BOUNDING_BOX_EXTENT,
      axis: true,
      grid: true,
    });
    const start = container.get<IMathRenderer>(
      TYPES.ENTRY_POINT_TYPES.PERPENDICULAR_BISECTOR
    );
    start.initialize();
  };
}
