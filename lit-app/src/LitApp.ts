import { LitElement, html, property } from 'lit-element';
import './design-system/components/main-container';
import './design-system/components/h1-title';
import './design-system/components/editable-check';

export class LitApp extends LitElement {
  @property({ type: String })
  title = 'My todo list';

  render() {
    return html`
      <main>
        <main-container max-width="lg">
          <h1-title>${this.title}</h1-title>
          <editable-check text="Item 1"></editable-check>
        </main-container>
      </main>
    `;
  }
}
