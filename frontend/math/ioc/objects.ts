export interface ISlideMeasure {
  updateValue(value: number);
}

export interface ISlideControl {}

export const TYPES = {
  OBJECTS: {
    SLIDE_MEASURE: Symbol('SlideMeasure'),
    SLIDE_CONTROL: Symbol('SlideControl'),
  },
};
