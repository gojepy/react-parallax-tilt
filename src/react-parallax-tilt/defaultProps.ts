import { Props } from './types';
import { defaultTiltProps } from '../features/tilt/defaultProps';
import { defaultGlareProps } from '../features/glare/defaultProps';

export const defaultProps: Props = {
  fixed: false,
  scale: 1,
  perspective: 1000,
  flipVertically: false,
  flipHorizontally: false,
  reset: true,
  transitionEasing: 'cubic-bezier(.03,.98,.52,.99)',
  transitionSpeed: 400,
  trackOnWindow: false,
  gyroscope: false,
  ...defaultTiltProps,
  ...defaultGlareProps,
};
