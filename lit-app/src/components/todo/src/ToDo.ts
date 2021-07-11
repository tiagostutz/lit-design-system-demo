import { LitElement, html, property, customElement, css } from 'lit-element';
import { TodoItem } from './TodoModel';
import '../../../design-system/components/editable-check';

@customElement('to-do')
export class ToDo extends LitElement {
  static get styles() {
    return css`
      :host h3 {
        margin-bottom: 1rem;
      }
      :host ul {
        margin: 0;
        padding: 0;
      }
      :host li {
        list-style: none;
        margin-bottom: 0.5rem;
      }
    `;
  }

  @property()
  items: Array<TodoItem> = [];

  render() {
    return html`
      <h3>${this.items?.length} items</h3>
      <ul>
        ${this.items?.map(
          item =>
            html`<li><editable-check text=${item.text}></editable-check></li>`
        )}
      </ul>
    `;
  }
}
