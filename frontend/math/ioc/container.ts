import { Container, interfaces } from 'inversify';
import { IMathRenderer, IScene, TYPES } from '.';

import StartPageMathRenderer from 'math/mathRenderers/startPage';
import JxgScene from 'math/wrappers/jxgScene';

const container = new Container();

container.bind<IScene>(TYPES.SCENE).to(JxgScene);

container
  .bind<IMathRenderer>(TYPES.ENTRY_POINT_TYPES.StartPage)
  .to(StartPageMathRenderer);

export default container;
