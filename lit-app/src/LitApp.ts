import { LitElement, html, property } from 'lit-element';
import './design-system/components/main-container';
import './design-system/components/h1-title';
import './components/todo';
import { TodoItem } from './components/todo/src/TodoModel';

export class LitApp extends LitElement {
  @property({ type: String })
  title = 'My todo list';

  render() {
    const seedItems: Array<TodoItem> = [
      { text: 'Buy milk', done: false },
      { text: 'Take the dog for a walk', done: false },
      { text: 'Do the dishes', done: true },
    ];
    return html`
      <main>
        <main-container max-width="lg">
          <h1-title>${this.title}</h1-title>
          <to-do .items=${seedItems}></to-do>
        </main-container>
      </main>
    `;
  }
}
