export type TodoItem = {
  id: Number;
  text: String;
  done?: Boolean;
};

const database: Array<TodoItem> = [
  { id: 1, text: 'Buy milk', done: false },
  { id: 2, text: 'Take the dog for a walk', done: false },
  { id: 3, text: 'Do the dishes', done: false },
];
/**
 * Emulating like it would go to a backend to fetch the current items
 */
export const getCurrentItems = (): Promise<Array<TodoItem>> =>
  new Promise<Array<TodoItem>>(resolve => {
    // Emulate like a HTTP request (latency from 0..1000ms)
    setTimeout(() => resolve(database), 200 * Math.random());
  });

export const createNewItem = (): Promise<TodoItem> =>
  new Promise<TodoItem>(resolve => {
    setTimeout(
      // Emulate like a HTTP request (latency from 0..1000ms)
      () => {
        const createdItem = { id: new Date().getTime(), done: false, text: '' };
        database.push(createdItem);
        resolve(createdItem);
      },
      200 * Math.random()
    );
  });

/**
 * Updates a item on the database
 * @param item item to be update
 */
export const updateTodoItem = (item: TodoItem) => {
  const elementIndex = database.findIndex(reg => reg.id === item.id);
  database[elementIndex] = JSON.parse(JSON.stringify(item)); // force replace with a new instance (clone)
};

export const deleteItem = (item: TodoItem) => {
  const elementIndex = database.findIndex(reg => reg.id === item.id);

  database.splice(elementIndex, 1);
};
