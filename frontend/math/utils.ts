import { IPointOptions } from 'math/ioc/geometry';

export const getJxgPointOptions = (
  options: IPointOptions
): JXG.PointAttributes => {
  if (!options) {
    return undefined;
  }

  const { face, ...rest } = options;
  return {
    face: (face as JXG.FaceType) || 'o',
    ...rest,
  };
};
