export declare function setTransition<T extends HTMLElement>(
  element: T,
  property: string,
  duration: number,
  timing: string,
  timeoutId?: number | null,
): number;
export declare function constrainToRange(value: number, rangeMin: number, rangeMax: number): number;
