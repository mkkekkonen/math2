export interface ISlideMeasure {
  updateValue(value: number);
}

export const TYPES = {
  OBJECTS: {
    SLIDE_MEASURE: Symbol('SlideMeasure'),
  },
};
