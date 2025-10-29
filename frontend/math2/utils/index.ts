export interface IBoardOptions {
  axis?: boolean;
  grid?: boolean;
}

export const getJxgPointOptions = (
  options: JXG.PointAttributes
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
