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

/**
 * This is the main component of the ToDo application.
 * It has the list of Todo items with its respective remove button
 * and have the "add new item" button also, to create new items in the Todo list
 */
@customElement('to-do')
export class ToDo extends LitElement {
  // Merge `designSystem` base style with specifics of this component
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

  /**
   * List of Todo items being managed (add, remove, marked completed, edited)
   */
  @property()
  items: Array<TodoItem> = [];

  /**
   * This functions invokes the service that creates a new item
   * After the item is created, retrieve all the items using the
   * service to retrieve all (updated list)
   */
  async addNewItem() {
    await createNewItem();

    // reload items
    this.items = []; // this is ugly because makes the screen blink, but with direct assignment it was happening a "Shadow DOM dirty update"
    this.items = [...(await getCurrentItems())];
  }

  /**
   * Removes and item from the list invoking the respetive service
   * and then updating the list
   * @param item to be removed
   */
  async removeItem(item: TodoItem) {
    await deleteItem(item);

    // Reload items.
    this.items = []; // this is ugly because makes the screen blink, but with direct assignment it was happening a "Shadow DOM dirty update"
    this.items = [...(await getCurrentItems())];
  }

  /**
   * Event handler for the event fired when an item modifies.
   * This modification could be it's text or its checked property
   *
   * @param item item that has been updated
   * @param param1 contains the two possible types of update: text or if was checked
   */
  itemUpdated(
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

    if (this.items) {
      updateTodoItem(mutatedItem);
    }
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
