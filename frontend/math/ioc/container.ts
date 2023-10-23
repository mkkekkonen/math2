import { Container } from 'inversify';
import {
  ICircleFactory,
  ILineSegmentFactory,
  IMathRenderer,
  IPointFactory,
  ISlideMeasureFactory,
  TYPES,
} from '.';

import StartPageMathRenderer from 'math/mathRenderers/startPage';
import PointFactory from 'math/factories/pointFactory';
import CircleFactory from 'math/factories/circleFactory';
import JxgScene from 'math/wrappers/jxgScene';
import LineSegmentFactory from 'math/factories/lineSegmentFactory';
import SlideMeasureFactory from 'math/factories/slideMeasureFactory';

const container = new Container();

container.bind(TYPES.SCENE).to(JxgScene).inSingletonScope();

container
  .bind<IPointFactory>(TYPES.FACTORIES.POINT_FACTORY)
  .to(PointFactory)
  .inSingletonScope();
container
  .bind<ICircleFactory>(TYPES.FACTORIES.CIRCLE_FACTORY)
  .to(CircleFactory)
  .inSingletonScope();
container
  .bind<ILineSegmentFactory>(TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
  .to(LineSegmentFactory)
  .inSingletonScope();
container
  .bind<ISlideMeasureFactory>(TYPES.FACTORIES.SLIDE_MEASURE_FACTORY)
  .to(SlideMeasureFactory)
  .inSingletonScope();

container
  .bind<IMathRenderer>(TYPES.ENTRY_POINT_TYPES.START_PAGE)
  .to(StartPageMathRenderer);

export default container;
