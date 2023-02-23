// GraphQL
import { gql } from '@apollo/client';
// Types
import { Item } from '../../types/TodoTypes';

interface UpdateTodoItemStatusMutationVariables {
  input: {
    completed: boolean;
    id: string;
  };
}

interface UpdateTodoItemStatusMutationData {
  todoItems: Item;
}

const UpdateTodoItemStatusMutation = gql`
  mutation UpdateTodoItemStatusMutation($input: UpdateTodoItemStatusInput) {
    updateTodoItemStatus(input: $input) {
      id

      title
      description
    }
  }
`;

export default UpdateTodoItemStatusMutation;
export type {
  UpdateTodoItemStatusMutationData,
  UpdateTodoItemStatusMutationVariables,
};
