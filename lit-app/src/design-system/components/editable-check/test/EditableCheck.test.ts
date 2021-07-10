import { html, fixture, expect } from '@open-wc/testing';

import { EditableCheck } from '../src/EditableCheck';
import '..';

describe('EditableCheck defaults', () => {
  let element: EditableCheck;
  beforeEach(async () => {
    element = await fixture(
      html`<editable-check
        read-only=${true}
        edit-mode="display"
        text="Readonly text not editing"
      ></editable-check>`
    );
  });

  it('Renders a `checkbox` with a readonly text', () => {
    const editableInlineText = element.shadowRoot!.querySelector(
      'editable-inline-text'
    )!;
    const check = element.shadowRoot!.querySelector('input')!;
    const span = editableInlineText.shadowRoot!.querySelector('span')!;

    expect(check).to.exist;
    expect(editableInlineText).to.exist;
    expect(span).to.exist;
    expect(check.checked).to.equal(false);
    expect(span.textContent).to.equal('Readonly text not editing');
  });

  it('Checks the `checkbox` and changes the check state and and edit-inline-text state', () => {
    const editableInlineText = element.shadowRoot!.querySelector(
      'editable-inline-text'
    )!;
    const check = element.shadowRoot!.querySelector('input')!;
    const span = editableInlineText.shadowRoot!.querySelector('span')!;

    expect(check).to.exist;
    expect(editableInlineText).to.exist;
    expect(span).to.exist;
    expect(check.checked).to.equal(false);
    expect(span.textContent).to.equal('Readonly text not editing');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
