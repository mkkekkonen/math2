import JXG from 'jsxgraph';
import { IBoardOptions } from 'math2/utils';

abstract class AbstractMathRenderer {
  protected _animatable = false;
  protected _animationRunning = true;

  protected _board: JXG.Board;

  public constructor(boardOptions: IBoardOptions, bboxExtent: number) {
    this._board = JXG.JSXGraph.initBoard('graph', {
      boundingBox: [-bboxExtent, bboxExtent, bboxExtent, -bboxExtent],
      axis: boardOptions.axis,
      grid: boardOptions.grid,
    });
  }

  public get animatable() {
    return this._animatable;
  }

  public initialize = () => {};

  public animate = (_: number) => {
    if (!this.animatable) {
      return;
    }
  };

  public printLog = (log: string) => {
    document.getElementById('log').innerText = log;
  };

  public endAnimation = () => {
    this._animationRunning = false;
    JXG.JSXGraph.freeBoard(this._board);
  };
}

export default AbstractMathRenderer;
