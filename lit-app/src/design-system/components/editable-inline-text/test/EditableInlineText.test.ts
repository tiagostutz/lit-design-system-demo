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

describe('EditableInlineText editMode=editing', () => {
  let element: EditableInlineText;
  beforeEach(async () => {
    element = await fixture(
      html`<editable-inline-text
        edit-mode="editing"
        text="Text editing"
      ></editable-inline-text>`
    );
  });

  it('Renders a `input` with a text change interaction', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.not.exist;
    expect(input.value).to.equal('Text editing');

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
    element.readOnly = true;
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.not.exist;
    expect(input.value).to.equal('Text editing');

    // Emulate like the user typed a value
    input.value = 'Text editing';
    // Fire the change object
    input.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: false, composed: false })
    );
    expect(input.value).to.equal('Text editing');
    expect(element.text).to.equal('Text editing');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('EditableInlineText editMode=editing  and readOnly=true', () => {
  let element: EditableInlineText;
  beforeEach(async () => {
    element = await fixture(
      html`<editable-inline-text
        edit-mode="editing"
        read-only="true"
        text="Text editing"
      ></editable-inline-text>`
    );
  });

  it('Renders a `input` disabled due to being readOnly', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.not.exist;
    expect(input.value).to.equal('Text editing');

    // Emulate like the user typed a value
    input.value = 'Text editing';
    // Fire the change object
    input.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: false, composed: false })
    );
    expect(input.disabled).to.equal(true);
    expect(input.value).to.equal('Text editing');
    expect(element.text).to.equal('Text editing');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
