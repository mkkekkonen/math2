export interface IMathRenderer {
  initialize(): void;
  animate(timeStamp: number): void;
  printLog(log: string): void;
}

export interface IScene {
  initialize(options: any): void;
}

export interface ISceneOptions {
  bboxExtent?: number;
  axis?: boolean;
  grid?: boolean;
}

export const TYPES = {
  ENTRY_POINT_TYPES: {
    StartPage: Symbol('StartPage'),
  },
  BOARD_CONFIG: Symbol('BoardConfig'),
  SCENE: Symbol('Scene'),
  SCENE_FACTORY: Symbol('SceneFactory'),
};
