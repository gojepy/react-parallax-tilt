import { RefObject } from 'react';
export declare type GlareProps = {
  /**
   * Boolean to enable/disable glare effect.
   */
  glareEnable?: boolean;
  /**
   * The maximum glare opacity (0.5 = 50%, 1 = 100%, etc.). Range: 0 - 1
   */
  glareMaxOpacity?: number;
  /**
   * Set color of glare effect.
   */
  glareColor?: string;
  /**
   * Set position of glare effect.
   */
  glarePosition?: GlarePosition;
  /**
   * Reverse the glare direction.
   */
  glareReverse?: boolean;
  /**
   * Set the glare parent element
   */
  glareParentEl?: Array<RefObject<HTMLElement>>;
};
export declare type GlarePosition = 'top' | 'right' | 'bottom' | 'left' | 'all';
export declare type GlareSize = {
  width: number;
  height: number;
};
export declare type GlareElements = {
  glareEl: HTMLDivElement;
  glareWrapperEl: HTMLDivElement;
  transitionTimeoutId: number | undefined;
};
