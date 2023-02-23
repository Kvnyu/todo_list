// GraphQL
import { gql } from '@apollo/client';
// Types
import { Item } from '../../types/TodoTypes';

interface TodoItemsQueryVariables {}

interface TodoItemsQueryData {
  todoItems: Item[] | [];
}

const TodoItemsQuery = gql`
  query TodoItemsQuery {
    todoItems {
      id

      title
      description
      completed
    }
  }
`;

export default TodoItemsQuery;
export type { TodoItemsQueryData, TodoItemsQueryVariables };
