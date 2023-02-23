import React from 'react';
// Hooks
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
// Modules
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  useMutation,
  useQuery,
} from '@apollo/client';
import Link from 'next/link';
// MUI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
// Components
import Template from '../../components/template/Template';
// FUI
import Typography from '../../theme/overrides/Typography';
// GraphQL
import TodoItemQuery, {
  TodoItemQueryData,
  TodoItemQueryVariables,
} from '../../lib/graphql/query/TodoItemQuery.graphql';
import UpdateTodoItemStatusMutation, {
  UpdateTodoItemStatusMutationData,
  UpdateTodoItemStatusMutationVariables,
} from '../../lib/graphql/mutation/UpdateTodoItemStatusMutation.graphql';
// Styles
import { Color } from '../../theme/theme';
// Lib
import paths from '../../lib/paths';

interface ViewTodoData {
  completed: boolean;
  description?: string;
  id: string;
  title: string;
}

interface Props extends ViewTodoData {}

const ViewPage: NextPage<Props> = (serverProps) => {
  const router = useRouter();

  const [updateTodoStatus] = useMutation<
    UpdateTodoItemStatusMutationData,
    UpdateTodoItemStatusMutationVariables
  >(UpdateTodoItemStatusMutation, {
    // I think there is an issue with this refetch not automatically refreshing value,
    // as the original TodoItemQuery is done on the server side, whereas this would
    // be a client side call, so I need to have a TodoItemQuery client side as well
    refetchQueries: [
      {
        query: TodoItemQuery,
        variables: {
          id: router.query.id,
        },
      },
    ],
  });
  const { data } = useQuery<TodoItemQueryData, TodoItemQueryVariables>(
    TodoItemQuery,
    {
      variables: {
        id: router.query.id as string,
      },
    },
  );
  let props;
  if (data) {
    props = data.TodoItem;
  } else {
    props = serverProps;
  }

  const onSubmit = () => {
    updateTodoStatus({
      variables: {
        input: {
          completed: !props.completed,
          id: router.query.id as string,
        },
      },
    }).then(() => {});
  };

  return (
    <Template pageName={props.title}>
      {' '}
      <Container disableGutters maxWidth="md">
        <Box bgcolor={Color.WHITE} borderRadius="8px" mt={4} pb={4}>
          <Box display="flex" justifyContent="space-between" p={3}>
            <Link passHref href={paths.home.href}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <Link passHref href={paths.update.href(router.query.id as string)}>
              <IconButton>
                <CreateIcon />
              </IconButton>
            </Link>
          </Box>
          <Box minHeight="600px" px={2}>
            <Container maxWidth="sm">
              <Box p={3}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Box color={Color.SMOKE} fontSize={16} mb={1.5}>
                      About this task:
                    </Box>
                    <Box
                      color={Color.JET}
                      minHeight="400px"
                      textOverflow="scroll"
                    >
                      {props.description}
                    </Box>
                    <Box display="flex" justifyContent="center" mt={4}>
                      <Button
                        color="primary"
                        style={{
                          backgroundColor: Color.FRESH,
                          textTransform: 'none',
                        }}
                        variant="outlined"
                        onClick={onSubmit}
                      >
                        <Typography customColor={Color.WHITE}>
                          {props.completed
                            ? 'Mark as pending'
                            : 'Mark as completed'}
                        </Typography>
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Box>
      </Container>
    </Template>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  // We have to use this as we are requesting data on server side
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      credentials: 'same-origin',
      uri: process.env.NEXT_PUBLIC_API_URL,
    }),
    ssrMode: true,
  });

  const { data, error } = await client.query<
    TodoItemQueryData,
    TodoItemQueryVariables
  >({
    query: TodoItemQuery,
    variables: {
      id: context?.params?.id as string,
    },
  });

  if (data && data.TodoItem) {
    return {
      props: { ...data.TodoItem },
    };
  }

  if (error) {
    return {
      notFound: true,
    };
  }

  return { props: {} };
};

export default ViewPage;
export { getServerSideProps };
