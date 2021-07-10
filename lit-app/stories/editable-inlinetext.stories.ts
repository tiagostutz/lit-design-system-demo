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
  readOnly?: boolean;
}

const Template: Story<ArgTypes> = ({
  editMode = 'edit',
  readOnly = false,
}: ArgTypes) => html`
  <editable-inline-text
    edit-mode=${editMode}
    read-only=${readOnly}
    text="Text content"
  ></editable-inline-text>
`;

export const EditModeDisplayReadOnly = Template.bind({});
EditModeDisplayReadOnly.args = {
  editMode: 'display',
  readOnly: true,
};
export const EditModeEditReadOnly = Template.bind({});
EditModeEditReadOnly.args = {
  editMode: 'edit',
  readOnly: true,
};
export const EditModeDisplay = Template.bind({});
EditModeDisplay.args = {
  editMode: 'display',
  readOnly: false,
};
export const EditModeEdit = Template.bind({});
EditModeEditReadOnly.args = {
  editMode: 'edit',
  readOnly: false,
};
