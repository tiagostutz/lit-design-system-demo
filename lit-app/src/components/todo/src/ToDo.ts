import { LitElement, html, property, customElement, css } from 'lit-element';
import {
  createNewItem,
  deleteItem,
  getCurrentItems,
  TodoItem,
  updateTodoItem,
} from './TodoModel';
import '../../../design-system/components/editable-check';
import '../../../design-system/components/button';
import { designSystem } from '../../../design-system/style';

@customElement('to-do')
export class ToDo extends LitElement {
  static get styles() {
    return [
      designSystem,
      css`
        :host h2 {
          margin-bottom: 1rem;
          font-size: 21px;
        }
        :host ul {
          margin: 0;
          padding: 0;
        }
        :host li {
          list-style: none;
          margin-bottom: 0.5rem;
        }
      `,
    ];
  }

  @property()
  items: Array<TodoItem> = [];

  async addNewItem() {
    await createNewItem();

    // reload items
    this.items = [...(await getCurrentItems())];
  }

  async removeItem(item: TodoItem) {
    await deleteItem(item);

    // reload items
    this.items = [...(await getCurrentItems())];
  }

  async itemUpdated(
    item: TodoItem,
    { checked, text }: { checked: Boolean; text: String }
  ) {
    let mutatedItem = Object.assign(item, {});
    if (checked) {
      mutatedItem = Object.assign(item, { done: checked });
    }
    if (text) {
      mutatedItem = Object.assign(item, { text });
    }

    updateTodoItem(mutatedItem);

    // reload items
    this.items = [...(await getCurrentItems())];
  }

  render() {
    const evalEditMode = (item: TodoItem) => {
      if (!item.text) {
        return 'edit';
      }
      return 'display';
    };

    return html`
      <h2>${this.items?.length} items</h2>
      <ul>
        ${this.items?.map(
          item =>
            html`<li>
              <div class="flex flex-row items-center justify-start">
                <editable-check
                  text=${item.text}
                  edit-mode=${evalEditMode(item)}
                  .checked=${item.done}
                  @checkToggled=${(e: any) => this.itemUpdated(item, e.detail)}
                  @textChanged=${(e: any) => this.itemUpdated(item, e.detail)}
                ></editable-check>
                <button
                  @click=${() => this.removeItem(item)}
                  title="Remove this item"
                  class="ml-1 cursor-pointer font-monospace bg-red-300 color-white border-0"
                >
                  X
                </button>
              </div>
            </li>`
        )}
      </ul>
      <div class="mt-2">
        <button-primary @click=${() => this.addNewItem()}
          >Add new Item</button-primary
        >
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'to-do': ToDo;
  }
}
