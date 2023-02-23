import React, { ChangeEvent, FC, useState } from 'react';
// Hooks
import { useMutation } from '@apollo/client';
// MUI
import { Fab, Link, Tab, Tabs } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// Components
import NoTodo from './NoTodo';
import TodoListView from './TodoListView';
// GraphQL
import TodoItemsQuery from '../../lib/graphql/query/TodoItemsQuery.graphql';
import UpdateTodoItemStatusMutation, {
  UpdateTodoItemStatusMutationData,
  UpdateTodoItemStatusMutationVariables,
} from '../../lib/graphql/mutation/UpdateTodoItemStatusMutation.graphql';
// Types
import { Item } from '../../lib/types/TodoTypes';
// Lib
import paths from '../../lib/paths';

interface Props {
  items: Item[];
}
const TodoList: FC<Props> = ({ items }) => {
  const [updateTodo] = useMutation<
    UpdateTodoItemStatusMutationData,
    UpdateTodoItemStatusMutationVariables
  >(UpdateTodoItemStatusMutation, {
    refetchQueries: [{ query: TodoItemsQuery }],
  });
  const [tabIndex, setTabIndex] = useState(0);

  const handleCheckboxFilled = async (event) => {
    updateTodo({
      variables: {
        input: {
          completed: true,
          id: event.target.value,
        },
      },
    })
      .then(() => {
        // TODO: Add a modal here
        console.log('Success!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckboxUnfilled = (event) => {
    updateTodo({
      variables: {
        input: {
          completed: false,
          id: event.target.value,
        },
      },
    });
  };

  const handleTabChange = (event: ChangeEvent<{}>, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const renderItemList = () => {
    const completedItems = [];
    const pendingItems = [];
    if (items && items.length !== 0) {
      items.map((item) => {
        if (item.completed) {
          completedItems.push(item);
        } else {
          pendingItems.push(item);
        }
      });
    }

    // Completed tab
    if (tabIndex === 1) {
      return (
        <TodoListView
          handleCheckboxClick={handleCheckboxUnfilled}
          items={completedItems}
        />
      );
    }

    // Pending tab
    if (pendingItems.length == 0) {
      return <NoTodo />;
    }
    return (
      <TodoListView
        handleCheckboxClick={handleCheckboxFilled}
        items={pendingItems}
      />
    );
  };

  return (
    <Box minHeight="">
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" m={2}>
          <Tabs
            aria-label="tabs"
            indicatorColor="primary"
            textColor="primary"
            value={tabIndex}
            onChange={handleTabChange}
          >
            <Tab label="Pending" />
            <Tab label="Completed" />
          </Tabs>
        </Box>
        <Box flex="auto" mt={4}>
          {renderItemList()}
        </Box>
        <Box display="flex" justifyContent="flex-end" my={4}>
          <Link href={paths.create.href}>
            <Fab aria-label="add" color="primary">
              <AddIcon />
            </Fab>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};
export default TodoList;
