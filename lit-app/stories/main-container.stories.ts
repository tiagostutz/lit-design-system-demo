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

export const MainContainer = Template.bind({});
MainContainer.args = {
  position: 'center',
  maxWidth: 'lg',
};
