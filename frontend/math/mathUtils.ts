import Vector2 from './math/vector2';

export const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);

export const roundTo2DecimalPlaces = (n: number) => Math.round(n * 100) / 100;

export const calculateAngleBetweenPointAndCircle = (
  circleCenter: Vector2,
  point: Vector2
) => {
  const delta = point.subtract(circleCenter);
  return Math.atan2(delta.x, delta.y);
};

export const getCoordinatesWithRadius = (
  x: number,
  y: number,
  radius: number
) => {
  const angle = Math.atan2(y, x);
  return getCoordinatesFromAngle(angle, radius, true);
};

export const getCoordinatesFromAngle = (
  angle: number,
  radius: number,
  radians = false
) => {
  const convertedAngle = radians ? angle : degreesToRadians(angle);
  return [radius * Math.cos(convertedAngle), radius * Math.sin(convertedAngle)];
};
