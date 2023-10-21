import { Container } from 'inversify';
import { ICircleFactory, IMathRenderer, IPointFactory, TYPES } from '.';

import StartPageMathRenderer from 'math/mathRenderers/startPage';
import PointFactory from 'math/factories/pointFactory';
import CircleFactory from 'math/factories/circleFactory';
import JxgScene from 'math/wrappers/jxgScene';

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
  .bind<IMathRenderer>(TYPES.ENTRY_POINT_TYPES.StartPage)
  .to(StartPageMathRenderer);

export default container;
