export interface IMathRenderer {
  initialize(): void;
  animate(timeStamp: number): void;
  printLog(log: string): void;
  endAnimation(): void;
}

export interface IScene {
  initialize(bboxExtent?: number): void;
  destroy(): void;
}

export interface ISceneOptions {
  axis?: boolean;
  grid?: boolean;
}

export const TYPES = {
  MATH_RENDERER_TYPES: {
    START_PAGE: Symbol('StartPage'),
    PERPENDICULAR_BISECTOR: Symbol('PerpendicularBisector'),
    ANGLE_CLASSIFICATION: Symbol('AngleClassification'),
    ANGLE_BISECTOR: Symbol('AngleBisector'),
    SUM_OF_ANGLES: Symbol('SumOfAngles'),
    COMPLEMENTARY_ANGLES: Symbol('ComplementaryAngles'),
  },
  BOARD_CONFIG: Symbol('BoardConfig'),
  SCENE: Symbol('Scene'),
};
