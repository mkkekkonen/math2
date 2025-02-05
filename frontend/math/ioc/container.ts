import { Container } from 'inversify';

import { TYPES as APP_TYPES, IMathRenderer } from 'math/ioc/app';
import {
  TYPES as FACTORY_TYPES,
  IPointFactory,
  ICircleFactory,
  ILineSegmentFactory,
  ISlideMeasureFactory,
  ISlideControlFactory,
  ILineFactory,
  IAngleFactory,
} from 'math/ioc/factories';

import StartPageMathRenderer from 'math/mathRenderers/startPage';
import PerpendicularBisectorMathRenderer from 'math/mathRenderers/perpendicularBisector';
import AngleClassificationMathRenderer from 'math/mathRenderers/angleClassification';
import AngleBisectorMathRenderer from 'math/mathRenderers/angleBisector';
import SumOfAnglesMathRenderer from 'math/mathRenderers/sumOfAngles';
import ComplementaryAnglesMathRenderer from 'math/mathRenderers/complementaryAngles';
import SupplementaryAnglesMathRenderer from 'math/mathRenderers/supplementaryAngles';
import ExplementaryAnglesMathRenderer from 'math/mathRenderers/explementaryAngles';
import CorrespondingAnglesMathRenderer from 'math/mathRenderers/correspondingAngles';
import CorrespondingAngles2MathRenderer from '@/mathRenderers/correspondingAngles2';

import JxgScene from 'math/wrappers/jxgScene';

import JxgPointFactory from 'math/factories/jxgPointFactory';
import JxgCircleFactory from 'math/factories/jxgCircleFactory';
import JxgLineSegmentFactory from 'math/factories/jxgLineSegmentFactory';
import JxgSlideMeasureFactory from 'math/factories/jxgSlideMeasureFactory';
import JxgLineFactory from 'math/factories/jxgLineFactory';
import JxgAngleFactory from 'math/factories/jxgAngleFactory';
import JxgSlideControlFactory from 'math/factories/jxgSlideControlFactory';
import PointProjectionMathRenderer from '@/mathRenderers/pointProjection';

const container = new Container();

container.bind(APP_TYPES.SCENE).to(JxgScene).inSingletonScope();

container
  .bind<IPointFactory>(FACTORY_TYPES.FACTORIES.POINT_FACTORY)
  .to(JxgPointFactory)
  .inSingletonScope();
container
  .bind<ICircleFactory>(FACTORY_TYPES.FACTORIES.CIRCLE_FACTORY)
  .to(JxgCircleFactory)
  .inSingletonScope();
container
  .bind<ILineSegmentFactory>(FACTORY_TYPES.FACTORIES.LINE_SEGMENT_FACTORY)
  .to(JxgLineSegmentFactory)
  .inSingletonScope();
container
  .bind<ILineFactory>(FACTORY_TYPES.FACTORIES.LINE_FACTORY)
  .to(JxgLineFactory)
  .inSingletonScope();
container
  .bind<IAngleFactory>(FACTORY_TYPES.FACTORIES.ANGLE_FACTORY)
  .to(JxgAngleFactory)
  .inSingletonScope();

container
  .bind<ISlideMeasureFactory>(FACTORY_TYPES.FACTORIES.SLIDE_MEASURE_FACTORY)
  .to(JxgSlideMeasureFactory)
  .inSingletonScope();
container
  .bind<ISlideControlFactory>(FACTORY_TYPES.FACTORIES.SLIDE_CONTROL_FACTORY)
  .to(JxgSlideControlFactory)
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
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.ANGLE_BISECTOR)
  .to(AngleBisectorMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.SUM_OF_ANGLES)
  .to(SumOfAnglesMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.COMPLEMENTARY_ANGLES)
  .to(ComplementaryAnglesMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.SUPPLEMENTARY_ANGLES)
  .to(SupplementaryAnglesMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.EXPLEMENTARY_ANGLES)
  .to(ExplementaryAnglesMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.CORRESPODING_ANGLES)
  .to(CorrespondingAnglesMathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.CORRESPONDING_ANGLES_2)
  .to(CorrespondingAngles2MathRenderer);
container
  .bind<IMathRenderer>(APP_TYPES.MATH_RENDERER_TYPES.POINT_PROJECTION)
  .to(PointProjectionMathRenderer);

export default container;
