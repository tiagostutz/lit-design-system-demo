import { html, fixture, expect } from '@open-wc/testing';

import { EditableInlineText } from '../src/EditableInlineText';
import '..';

describe('EditableInlineText defaults', () => {
  let element: EditableInlineText;
  beforeEach(async () => {
    element = await fixture(
      html`<editable-inline-text
        text="Readonly text not editing"
      ></editable-inline-text>`
    );
  });

  it('Renders a `span` with a text for read only behavior', () => {
    const span = element.shadowRoot!.querySelector('span')!;
    const input = element.shadowRoot!.querySelector('input')!;
    expect(input).to.not.exist;
    expect(span).to.exist;
    expect(span.textContent).to.equal('Readonly text not editing');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('EditableInlineText editMode=edit', () => {
  let element: EditableInlineText;
  beforeEach(async () => {
    element = await fixture(
      html`<editable-inline-text
        edit-mode="edit"
        text="Text original"
      ></editable-inline-text>`
    );
  });

  it('Renders a `input` with a text change interaction', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.not.exist;
    expect(input.value).to.equal('Text original');

    // Emulate like the user typed a value
    input.value = 'Text Modified';
    // Fire the change object
    input.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: false, composed: false })
    );
    expect(input.value).to.equal('Text Modified');
    expect(element.text).to.equal('Text Modified');
    expect(input.disabled).to.equal(false);
  });

  it('Renders a `input` with readonly behavior', () => {
    element.editMode = 'readOnlyEdit';
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.not.exist;
    expect(input.value).to.equal('Text original');

    // Emulate like the user typed a value
    input.value = 'Text editing';
    // Fire the change object
    input.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: false, composed: false })
    );
    expect(input.value).to.equal('Text editing');
    expect(element.text).to.equal('Text original'); // as the internal readOnly = true then the value cannot be changed
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('EditableInlineText editMode=edit  and readOnly=true', () => {
  let element: EditableInlineText;
  beforeEach(async () => {
    element = await fixture(
      html`<editable-inline-text
        edit-mode="readOnlyEdit"
        text="Text original"
      ></editable-inline-text>`
    );
  });

  it('Renders a `input` disabled due to being readOnly', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.not.exist;
    expect(input.value).to.equal('Text original');

    // Emulate like the user typed a value
    input.value = 'Text modified';
    // Fire the change object
    input.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: false, composed: false })
    );
    expect(input.disabled).to.equal(true);
    // due to being readonly, even thought the input value has changed, the property can't change
    expect(input.value).to.equal('Text modified');
    expect(element.text).to.equal('Text original');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('EditableInlineText Enter triggered', () => {
  let element: EditableInlineText;
  beforeEach(async () => {
    element = await fixture(
      html`<editable-inline-text edit-mode="edit"></editable-inline-text>`
    );
  });

  it('Change form `input` to `span` based on editMode', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.not.exist;
    expect(input.value).to.equal('');

    // Emulate like the user typed a value
    input.value = 'Text Modified';
    // Fire the change object
    input.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: false, composed: false })
    );
    expect(input.value).to.equal('Text Modified');
    expect(element.text).to.equal('Text Modified');
    expect(input.disabled).to.equal(false);

    // Not working properly. The key property is not being set
    // input.dispatchEvent(
    //   new KeyboardEvent('keyup', {
    //     key: 'Enter',
    //     bubbles: true,
    //     cancelable: false,
    //     composed: false
    //   })
    // );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('EditableInlineText editModeChanged fired', () => {
  let element: EditableInlineText;
  const _handleEditModeChanged = (e: any) => {
    expect(e.detail.editMode).to.equal('display');
  };
  beforeEach(async () => {
    element = await fixture(
      html`<editable-inline-text
        edit-mode="edit"
        @editModeChanged=${_handleEditModeChanged}
      ></editable-inline-text>`
    );
  });

  it('Set editMode and receive fire event', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.not.exist;
    expect(input.value).to.equal('');

    element.editMode = 'display';
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('EditableInlineText Span Double Clicked toggling editMode', () => {
  let element: EditableInlineText;
  beforeEach(async () => {
    element = await fixture(
      html`<editable-inline-text edit-mode="display"></editable-inline-text>`
    );
  });

  it('Change editMode toggling double click', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(input).to.not.exist;
    expect(span).to.exist;

    expect(element.editMode).to.equal('display');
    // Fire the change object
    span.dispatchEvent(
      new Event('dblclick', {
        bubbles: true,
        cancelable: false,
        composed: false,
      })
    );
    expect(element.editMode).to.equal('edit');
  });

  it('Dont change editMode even toggling double click in readOnly', () => {
    element.editMode = 'readOnlyDisplay';
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(input).to.not.exist;
    expect(span).to.exist;

    expect(element.editMode).to.equal('readOnlyDisplay');
    // Fire the change object
    span.dispatchEvent(
      new Event('dblclick', {
        bubbles: true,
        cancelable: false,
        composed: false,
      })
    );
    expect(element.editMode).to.equal('readOnlyDisplay'); // should not change the editMode because it is in "readOnly" mode
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
