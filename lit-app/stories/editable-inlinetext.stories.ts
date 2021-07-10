import { html, TemplateResult } from 'lit-html';
import '../src/design-system/components/editable-inline-text/index';
import { EditMode } from '../src/design-system/components/editable-inline-text/src/EditableInlineText';

export default {
  title: 'EditableInlineText',
  component: 'editable-inline-text',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  editMode?: EditMode;
}

const Template: Story<ArgTypes> = ({ editMode = 'edit' }: ArgTypes) => html`
  <editable-inline-text
    edit-mode=${editMode}
    text="Text content"
  ></editable-inline-text>
`;

export const EditModeDisplayReadOnly = Template.bind({});
EditModeDisplayReadOnly.args = {
  editMode: 'readOnlyDisplay',
};
export const EditModeEditReadOnly = Template.bind({});
EditModeEditReadOnly.args = {
  editMode: 'readOnlyEdit',
};
export const EditModeDisplay = Template.bind({});
EditModeDisplay.args = {
  editMode: 'display',
};
export const EditModeEdit = Template.bind({});
EditModeEditReadOnly.args = {
  editMode: 'edit',
};
