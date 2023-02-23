// GraphQL
import { gql } from '@apollo/client';
// Types
import { Item } from '../../types/TodoTypes';

interface CreateTodoItemMutationVariables {
  input: {
    description: string;
    title: string;
  };
}

interface CreateTodoItemMutationData {
  TodoItem: Item;
}

const CreateTodoItemMutation = gql`
  mutation CreateTodoItemMutation($input: CreateTodoItemInput) {
    CreateTodoItem(input: $input) {
      id

      title
      description
    }
  }
`;

export default CreateTodoItemMutation;
export type { CreateTodoItemMutationData, CreateTodoItemMutationVariables };
