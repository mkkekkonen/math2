import Vector2 from './math/vector2';

export const calculateAngleBetweenPointAndCircle = (
  circleCenter: Vector2,
  point: Vector2
) => {
  const delta = point.subtract(circleCenter);
  return Math.atan2(delta.x, delta.y);
};
