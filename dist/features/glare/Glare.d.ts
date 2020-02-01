import { GlareProps, GlareElements } from './types';
import { ElementSizePosition, ClientPosition } from '../../common/types';
import { IStyle } from '../../common/IStyle';
export declare class Glare implements IStyle {
  glareElArr: Array<GlareElements>;
  glareAngle: number;
  glareOpacity: number;
  constructor(wrapperElSize: ElementSizePosition, elCount?: Number);
  private calculateGlareSize;
  setSize: (wrapperElSize: ElementSizePosition) => void;
  update: (
    wrapperElClientPosition: ClientPosition,
    props: GlareProps,
    flipVertically: boolean,
    flipHorizontally: boolean,
  ) => void;
  private updateAngle;
  private updateOpacity;
  render: (props: GlareProps) => void;
}
