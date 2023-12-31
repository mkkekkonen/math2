import { IPointOptions } from 'math/ioc/geometry';

export const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);

export const roundTo2DecimalPlaces = (n: number) => Math.round(n * 100) / 100;

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
