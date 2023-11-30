import { Container } from 'inversify';

import { TYPES as APP_TYPES, IMathRenderer } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  IPointFactory,
  ICircleFactory,
  ILineSegmentFactory,
  ISlideMeasureFactory,
} from 'math/ioc/factories';

import StartPageMathRenderer from 'math/mathRenderers/startPage';
import PerpendicularBisectorMathRenderer from 'math/mathRenderers/perpendicularBisector';
import PointFactory from 'math/factories/pointFactory';
import CircleFactory from 'math/factories/circleFactory';
import JxgScene from 'math/wrappers/jxgScene';
import LineSegmentFactory from 'math/factories/lineSegmentFactory';
import SlideMeasureFactory from 'math/factories/slideMeasureFactory';

const container = new Container();

container.bind(APP_TYPES.SCENE).to(JxgScene).inSingletonScope();

container
  .bind<IPointFactory>(FACTORY_TYPES.FACTORIES.POINT_FACTORY)
  .to(PointFactory)
  .inSingletonScope();
container
  .bind<ICircleFactory>(FACTORY_TYPES.FACTORIES.CIRCLE_FACTORY)
  .to(CircleFactory)
  .inSingletonScope();
container
  .bind<ILineSegmentFactory>(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
  .to(LineSegmentFactory)
  .inSingletonScope();
container
  .bind<ISlideMeasureFactory>(FACTORY_TYPES.FACTORIES.SLIDE_MEASURE_FACTORY)
  .to(SlideMeasureFactory)
  .inSingletonScope();

container
  .bind<IMathRenderer>(APP_TYPES.ENTRY_POINT_TYPES.START_PAGE)
  .to(StartPageMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.ENTRY_POINT_TYPES.PERPENDICULAR_BISECTOR)
  .to(PerpendicularBisectorMathRenderer);

export default container;
