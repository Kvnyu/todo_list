// GraphQL
import { gql } from '@apollo/client';
// Types
import { Item } from '../../types/TodoTypes';

interface DeleteTodoItemMutationVariables {
  id: string;
}

interface DeleteTodoItemMutationData {
  TodoItem: Item;
}

const DeleteTodoItemMutation = gql`
  mutation DeleteTodoItemMutation($id: ID!) {
    DeleteTodoItem(id: $id) {
      id

      title
      description
    }
  }
`;

export default DeleteTodoItemMutation;
export type { DeleteTodoItemMutationData, DeleteTodoItemMutationVariables };
