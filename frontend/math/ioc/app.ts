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
  ENTRY_POINT_TYPES: {
    START_PAGE: Symbol('StartPage'),
    PERPENDICULAR_BISECTOR: Symbol('PerpendicularBisector'),
  },
  BOARD_CONFIG: Symbol('BoardConfig'),
  SCENE: Symbol('Scene'),
};