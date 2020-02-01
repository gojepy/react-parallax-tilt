import { GlareProps, GlareSize, GlareElements } from './types';
import { constrainToRange } from '../../common/utils';
import { ElementSizePosition, ClientPosition } from '../../common/types';
import { IStyle } from '../../common/IStyle';

const GLARE_EL_SIZE_FACTOR = 2;

export class Glare implements IStyle {
  public glareElArr: Array<GlareElements> = [];

  public glareAngle: number = 0;
  public glareOpacity: number = 0;

  constructor(wrapperElSize: ElementSizePosition, elCount: Number = 1) {
    const styleGlareWrapper = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    };

    const glareSize = this.calculateGlareSize(wrapperElSize);
    const styleGlare = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      'transform-origin': '0% 0%',
      'pointer-events': 'none',
      width: `${glareSize.width}px`,
      height: `${glareSize.height}px`,
    };

    for (let i = 0; i < elCount; i++) {
      const glareWrapperEl = document.createElement('div');
      const glareEl = document.createElement('div');
      glareWrapperEl.appendChild(glareEl);
      glareWrapperEl.className = 'glare-wrapper';
      glareEl.className = 'glare';

      Object.assign(glareWrapperEl.style, styleGlareWrapper);
      Object.assign(glareEl.style, styleGlare);

      this.glareElArr.push({
        glareEl,
        glareWrapperEl,
        transitionTimeoutId: undefined,
      });
    }
  }

  private calculateGlareSize = (wrapperElSize: ElementSizePosition): GlareSize => {
    const s = GLARE_EL_SIZE_FACTOR * Math.max(wrapperElSize.width!, wrapperElSize.height!);
    return {
      width: s,
      height: s,
    };
  };

  public setSize = (wrapperElSize: ElementSizePosition): void => {
    const glareSize = this.calculateGlareSize(wrapperElSize);
    for (let i = 0, l = this.glareElArr.length; i < l; i++) {
      this.glareElArr[i].glareEl.style.width = `${glareSize.width}px`;
      this.glareElArr[i].glareEl.style.height = `${glareSize.height}px`;
    }
  };

  public update = (
    wrapperElClientPosition: ClientPosition,
    props: GlareProps,
    flipVertically: boolean,
    flipHorizontally: boolean,
  ): void => {
    this.updateAngle(wrapperElClientPosition, props.glareReverse!);
    this.updateOpacity(wrapperElClientPosition, props, flipVertically, flipHorizontally);
  };

  private updateAngle = (wrapperElClientPosition: ClientPosition, glareReverse: boolean): void => {
    const { xPercentage, yPercentage } = wrapperElClientPosition;

    const rad2Deg = 180 / Math.PI;
    // top 0°, right +90°, bottom -+180°, left -90°
    const glareAngle: number = xPercentage ? Math.atan2(yPercentage, -xPercentage) * rad2Deg : 0;

    const addGlareAngle: number = glareReverse ? 180 : 0;
    this.glareAngle = glareAngle - addGlareAngle;
  };

  private updateOpacity = (
    wrapperElClientPosition: ClientPosition,
    props: GlareProps,
    flipVertically: boolean,
    flipHorizontally: boolean,
  ): void => {
    const { xPercentage, yPercentage } = wrapperElClientPosition;
    const { glarePosition, glareReverse, glareMaxOpacity } = props;

    const flipVerticallyFactor = flipVertically ? -1 : 1;
    const flipHorizontallyFactor = flipHorizontally ? -1 : 1;

    let glareOpacityFactor: number;
    switch (glarePosition) {
      case 'top':
        glareOpacityFactor = -xPercentage! * flipVerticallyFactor;
        break;
      case 'right':
        glareOpacityFactor = yPercentage! * flipHorizontallyFactor;
        break;
      case 'bottom':
        glareOpacityFactor = xPercentage! * flipVerticallyFactor;
        break;
      case 'left':
        glareOpacityFactor = -yPercentage! * flipHorizontallyFactor;
        break;
      case 'all':
        glareOpacityFactor = Math.hypot(xPercentage, yPercentage);
        break;
      default:
        glareOpacityFactor = xPercentage! * flipVerticallyFactor;
    }

    glareOpacityFactor = glareReverse ? -glareOpacityFactor : glareOpacityFactor;
    const glareOpacityFactorRemoveNegative: number = constrainToRange(glareOpacityFactor, 0, 100);
    this.glareOpacity = (glareOpacityFactorRemoveNegative * glareMaxOpacity!) / 100;
  };

  public render = (props: GlareProps): void => {
    const { glareColor } = props;
    const linearGradient: string = `linear-gradient(0deg, rgba(255,255,255,0) 0%, ${glareColor} 100%)`;
    for (let i = 0, l = this.glareElArr.length; i < l; i++) {
      this.glareElArr[
        i
      ].glareEl.style.transform = `rotate(${this.glareAngle}deg) translate(-50%, -50%)`;
      this.glareElArr[i].glareEl.style.opacity = this.glareOpacity.toString();
      this.glareElArr[i].glareEl.style.background = linearGradient;
    }
  };
}
