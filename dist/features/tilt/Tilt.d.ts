import { TiltProps } from './types';
import { ClientPosition } from '../../common/types';
import { IStyle } from '../../common/IStyle';
export declare class Tilt<T extends HTMLElement> implements IStyle {
  glareAngle: number;
  glareOpacity: number;
  transitionTimeoutId: number | undefined;
  tiltAngleX: number;
  tiltAngleY: number;
  tiltAngleXPercentage: number;
  tiltAngleYPercentage: number;
  update: (wrapperElClientPosition: ClientPosition, props: TiltProps) => void;
  private updateTilt;
  private updateTiltManualInput;
  private updateTiltReverse;
  private updateTiltLimits;
  updateTiltAnglesPercentage: (props: TiltProps) => void;
  render: (element: T) => void;
}
