import { IBoardOptions } from 'math2/utils';
import AbstractMathRenderer from './abstractMathRenderer';

const BBOX_EXTENT = 10;

class PerpendicularBisectorMathRenderer extends AbstractMathRenderer {
  lineSegment: JXG.Segment;
  line: JXG.Line;

  constructor(boardOptions: IBoardOptions) {
    super(boardOptions, BBOX_EXTENT);
  }
}

export default PerpendicularBisectorMathRenderer;
