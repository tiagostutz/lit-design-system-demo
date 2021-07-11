import { LitElement, html, property, customElement, css } from 'lit-element';
import { getCurrentItems, TodoItem, updateTodoItem } from './TodoModel';
import '../../../design-system/components/editable-check';
import '../../../design-system/components/button';

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

  addNewItem() {
    this.items = [
      ...this.items,
      { id: new Date().getTime(), done: false, text: '' },
    ];
  }

  async itemChecked(item: TodoItem, checked: Boolean) {
    const mutatedItem = Object.assign(item, { checked });
    updateTodoItem(mutatedItem);

    // reload items
    this.items = await getCurrentItems();
  }

  render() {
    const evalEditMode = (item: TodoItem) => {
      if (!item.text) {
        return 'edit';
      }
      return 'display';
    };

    return html`
      <h3>${this.items?.length} items</h3>
      <ul>
        ${this.items?.map(
          item =>
            html`<li>
              <editable-check
                text=${item.text}
                edit-mode=${evalEditMode(item)}
                @checkToggled=${(e: any) =>
                  this.itemChecked(item, e.detail.checked)}
              ></editable-check>
            </li>`
        )}
      </ul>
      <button-primary @click=${() => this.addNewItem()}
        >Add new Item</button-primary
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'to-do': ToDo;
  }
}
