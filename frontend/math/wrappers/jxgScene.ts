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
  }

  initialize = (bboxExtent: number) => {
    const _bboxExtent = bboxExtent || DEFAULT_BBOX_EXTENT;

    this._board = JXG.JSXGraph.initBoard('graph', {
      boundingBox: [-_bboxExtent, _bboxExtent, _bboxExtent, -_bboxExtent],
      axis: this._config.axis,
      grid: this._config.grid,
    });
  };

  destroy = () => {
    JXG.JSXGraph.freeBoard(this._board);
  };

  get board() {
    return this._board;
  }
}

export default JxgScene;
