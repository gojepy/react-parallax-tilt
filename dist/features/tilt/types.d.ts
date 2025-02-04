export declare type TiltProps = {
  /**
   * Boolean to enable/disable tilt effect.
   */
  tiltEnable?: boolean;
  /**
   * Reverse the tilt direction.
   */
  tiltReverse?: boolean;
  /**
   * Max tilt rotation (degrees) on x axis. Range: 0 - 90
   */
  tiltMaxAngleX?: number;
  /**
   * Max tilt rotation (degrees) on y axis. Range: 0 - 90
   */
  tiltMaxAngleY?: number;
  /**
   * Which axis should be enabled. If null both are enabled.
   */
  tiltAxis?: Axis | null;
  /**
   * Manual tilt rotation (degrees) on x axis.
   */
  tiltAngleXManual?: number | null;
  /**
   * Manual tilt rotation (degrees) on y axis.
   */
  tiltAngleYManual?: number | null;
};
export declare type Axis = 'x' | 'y';
