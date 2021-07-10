import { html, TemplateResult } from 'lit-html';
import { Position } from '../src/design-system/components/common-types/positioning';
import { Breakpoints } from '../src/design-system/components/common-types/sizes';
import '../src/design-system/components/main-container/index';

export default {
  title: 'MainContainer',
  component: 'main-container',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  position?: Position;
  maxWidth?: Breakpoints;
}

const Template: Story<ArgTypes> = ({
  position = 'center',
  maxWidth = 'none',
}: ArgTypes) => html`
  <main-container max-width="${maxWidth}" position="${position}"
    >Container Demo</main-container
  >
`;

export const PositionNone = Template.bind({});
PositionNone.args = {
  position: 'none',
  maxWidth: 'md',
};
export const PositionCenter = Template.bind({});
PositionCenter.args = {
  position: 'center',
  maxWidth: 'md',
};

export const MaxWidthSM = Template.bind({});
MaxWidthSM.args = {
  position: 'center',
  maxWidth: 'sm',
};
export const MaxWidthMD = Template.bind({});
MaxWidthMD.args = {
  position: 'center',
  maxWidth: 'md',
};
export const MaxWidth2LG = Template.bind({});
MaxWidth2LG.args = {
  position: 'center',
  maxWidth: 'lg',
};
