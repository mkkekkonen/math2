import { Container } from 'inversify';

import { TYPES as APP_TYPES, IMathRenderer } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  IPointFactory,
  ICircleFactory,
  ILineSegmentFactory,
  ISlideMeasureFactory,
  ILineFactory,
  IAngleFactory,
} from 'math/ioc/factories';

import StartPageMathRenderer from 'math/mathRenderers/startPage';
import PerpendicularBisectorMathRenderer from 'math/mathRenderers/perpendicularBisector';
import AngleClassificationMathRenderer from 'math/mathRenderers/angleClassification';

import JxgScene from 'math/wrappers/jxgScene';

import PointFactory from 'math/factories/pointFactory';
import CircleFactory from 'math/factories/circleFactory';
import LineSegmentFactory from 'math/factories/lineSegmentFactory';
import SlideMeasureFactory from 'math/factories/slideMeasureFactory';
import LineFactory from 'math/factories/lineFactory';
import AngleFactory from 'math/factories/angleFactory';

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
  .bind<ILineFactory>(FACTORY_TYPES.FACTORIES.LINE_FACTORY)
  .to(LineFactory)
  .inSingletonScope();
container
  .bind<IAngleFactory>(FACTORY_TYPES.FACTORIES.ANGLE_FACTORY)
  .to(AngleFactory)
  .inSingletonScope();

container
  .bind<ISlideMeasureFactory>(FACTORY_TYPES.FACTORIES.SLIDE_MEASURE_FACTORY)
  .to(SlideMeasureFactory)
  .inSingletonScope();

container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.START_PAGE)
  .to(StartPageMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.PERPENDICULAR_BISECTOR)
  .to(PerpendicularBisectorMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.ANGLE_CLASSIFICATION)
  .to(AngleClassificationMathRenderer);

export default container;
