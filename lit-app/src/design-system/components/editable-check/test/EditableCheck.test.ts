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

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('EditableCheck click event handler', () => {
  let element: EditableCheck;
  let lastCheckedValue = false;
  const checkToggled = (e: any) => {
    expect(e.detail.checked).to.equal(!lastCheckedValue);
    lastCheckedValue = !lastCheckedValue;
  };
  beforeEach(async () => {
    element = await fixture(
      html`<editable-check
        read-only=${true}
        edit-mode="display"
        text="Readonly text not editing"
        @checkToggled=${checkToggled}
      ></editable-check>`
    );
  });

  it('Renders a `checkbox` and click twice toggling state', () => {
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

    expect(element.editMode).to.equal('display');
    // click (check true)
    check.dispatchEvent(
      new Event('click', {
        bubbles: true,
        cancelable: false,
        composed: false,
      })
    );

    // click (check false)
    check.dispatchEvent(
      new Event('click', {
        bubbles: true,
        cancelable: false,
        composed: false,
      })
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('EditableCheck click event checked state', () => {
  let element: EditableCheck;

  beforeEach(async () => {
    element = await fixture(
      html`<editable-check
        edit-mode="display"
        text="Readonly text not editing"
      ></editable-check>`
    );
  });

  it('Renders a `checkbox` with a readonly text', () =>
    new Promise(resolve => {
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
      expect(element.editMode).to.equal('display');

      // click (check true)
      check.dispatchEvent(
        new Event('click', {
          bubbles: true,
          cancelable: false,
          composed: false,
        })
      );
      expect(check.checked).to.equal(true);

      // Ugly. Check later how to use proper licecycle events
      setTimeout(() => {
        // Checkbox has been clicked and is now clicked (true)
        expect(element.editMode).to.equal('display');
        const editableInlineTextAfterSelect = element.shadowRoot!.querySelector(
          'editable-inline-text'
        )!;

        expect(editableInlineTextAfterSelect.editMode).to.equal(
          'readOnlyDisplay'
        );
        expect(editableInlineTextAfterSelect.textDecoration).to.equal(
          'line-through'
        );

        // click (check false)
        check.dispatchEvent(
          new Event('click', {
            bubbles: true,
            cancelable: false,
            composed: false,
          })
        );
        setTimeout(() => {
          // clicked again and now it is unchecked (false)
          expect(element.editMode).to.equal('display');
          const editableInlineTextAfterUnselect =
            element.shadowRoot!.querySelector('editable-inline-text')!;

          expect(editableInlineTextAfterUnselect.editMode).to.equal('display');
          expect(editableInlineTextAfterUnselect.textDecoration).to.equal('');

          resolve('');
        }, 200);
      }, 200);
    }));
});
