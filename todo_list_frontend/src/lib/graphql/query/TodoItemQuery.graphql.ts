// GraphQL
import { gql } from '@apollo/client';
// Types
import { Item } from '../../types/TodoTypes';

interface TodoItemQueryVariables {
  id: string;
}

interface TodoItemQueryData {
  TodoItem: Item;
}

const TodoItemQuery = gql`
  query TodoItemQuery($id: ID!) {
    TodoItem(id: $id) {
      id

      title
      description
      completed
    }
  }
`;

export default TodoItemQuery;
export type { TodoItemQueryData, TodoItemQueryVariables };
