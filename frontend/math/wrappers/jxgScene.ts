import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import JXG from 'jsxgraph';

import { IScene, ISceneOptions, TYPES } from 'math/ioc';

const DEFAULT_BBOX_EXTENT = 1.5;

@injectable()
class JxgScene implements IScene {
  private _config: ISceneOptions;
  private _board: JXG.Board;

  constructor(@inject(TYPES.BOARD_CONFIG) config: ISceneOptions) {
    this._config = config;
    this.initialize();
  }

  initialize() {
    const bboxExtent = this._config.bboxExtent || DEFAULT_BBOX_EXTENT;

    this._board = JXG.JSXGraph.initBoard('graph', {
      boundingBox: [-bboxExtent, bboxExtent, bboxExtent, -bboxExtent],
      axis: this._config.axis,
      grid: this._config.grid,
    });
  }

  get board() {
    return this._board;
  }
}

export default JxgScene;
