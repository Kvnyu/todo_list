// GraphQL
import { gql } from '@apollo/client';
// Types
import { Item } from '../../types/TodoTypes';

interface UpdateTodoItemMutationVariables {
  input: {
    id: string;
    item: {
      completed?: boolean;
      description?: string;
      title: string;
    };
  };
}

interface UpdateTodoItemMutationData {
  TodoItem: Item;
}

const UpdateTodoItemMutation = gql`
  mutation UpdateTodoItemMutation($input: UpdateTodoItemInput) {
    UpdateTodoItem(input: $input) {
      id

      title
      description
    }
  }
`;

export default UpdateTodoItemMutation;
export type { UpdateTodoItemMutationData, UpdateTodoItemMutationVariables };
