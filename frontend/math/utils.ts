import { FaceType } from 'jsxgraph';

import { IPointOptions } from 'math/ioc/geometry';

export const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const roundTo2DecimalPlaces = (n: number) => Math.round(n * 100) / 100;

export const getJxgPointOptions = (options: IPointOptions) => {
  if (!options) {
    return {};
  }

  const { coordinates, face, ...rest } = options;
  return {
    coordinates,
    pointAttributes: {
      face: (face as FaceType) || 'o',
      ...rest,
    },
  };
};
