import { LitElement, html, property } from 'lit-element';
import './design-system/components/main-container';
import './design-system/components/h1-title';
import './components/todo';
import { getCurrentItems, TodoItem } from './components/todo/src/TodoModel';

export class LitApp extends LitElement {
  @property({ type: String })
  title = 'My todo list';

  @property({ type: String })
  seedItems: Array<TodoItem> = [];

  constructor() {
    super();
    // load initial data
    (async () => {
      this.seedItems = await getCurrentItems();
    })();
  }

  render() {
    return html`
      <main>
        <main-container max-width="lg">
          <h1-title>${this.title}</h1-title>
          <to-do .items=${this.seedItems}></to-do>
        </main-container>
      </main>
    `;
  }
}
