import React from 'react';
// Modules
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/router';
// Hooks
import { Controller, useForm } from 'react-hook-form';
import { GetServerSideProps, NextPage } from 'next';
import { yupResolver } from '@hookform/resolvers/yup';
// Modules
import * as yup from 'yup';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// MUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
// Components
import Template from '../../components/template/Template';
// FUI
import Typography from '../../theme/overrides/Typography';
// GraphQL
import DeleteTodoItemMutation, {
  DeleteTodoItemMutationData,
  DeleteTodoItemMutationVariables,
} from '../../lib/graphql/mutation/DeleteTodoItemMutation.graphql';
import TodoItemQuery, {
  TodoItemQueryData,
  TodoItemQueryVariables,
} from '../../lib/graphql/query/TodoItemQuery.graphql';
import TodoItemsQuery from '../../lib/graphql/query/TodoItemsQuery.graphql';
import UpdateTodoItemMutation, {
  UpdateTodoItemMutationData,
  UpdateTodoItemMutationVariables,
} from '../../lib/graphql/mutation/UpdateTodoItemMutation.graphql';
// Styles
import { Color } from '../../theme/theme';
import TextField from '../../theme/overrides/TextField';
// Lib
import paths from '../../lib/paths';

interface UpdateTodoFormData {
  description?: string;
  title: string;
}

interface Props extends UpdateTodoFormData {}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
});

const UpdatePage: NextPage<Props> = (props) => {
  console.log(props);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateTodoFormData>({
    defaultValues: {
      description: props.description,
      title: props.title,
    },
    resolver: yupResolver(validationSchema),
  });

  const { id } = router.query;

  const [updateTodo] = useMutation<
    UpdateTodoItemMutationData,
    UpdateTodoItemMutationVariables
  >(UpdateTodoItemMutation, {
    refetchQueries: [{ query: TodoItemsQuery }],
  });

  const [deleteTodo] = useMutation<
    DeleteTodoItemMutationData,
    DeleteTodoItemMutationVariables
  >(DeleteTodoItemMutation, {
    refetchQueries: [{ query: TodoItemsQuery }],
  });

  const onSubmitSave = async (data: UpdateTodoFormData) => {
    console.log(data);
    updateTodo({
      variables: {
        input: {
          id: id as string,
          item: {
            description: data.description,
            title: data.title,
          },
        },
      },
    })
      .then(() => {
        router.push(paths.home.href);
      })
      .catch((error) => {
        // TODO: Add modal for errors
        console.log(error);
      });
  };

  const onSubmitRemove = async () => {
    deleteTodo({
      variables: {
        id: id as string,
      },
    })
      .then(() => {
        router.push(paths.home.href);
      })
      .catch((error) => console.log(error));
  };

  const renderContent = () => {
    return (
      <Container disableGutters maxWidth="md">
        <Box bgcolor={Color.WHITE} borderRadius="8px" minHeight="680px" mt={4}>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <IconButton href={paths.home.href}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmitSave)}>
            <Container maxWidth="sm">
              <Box p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography customColor={Color.JET}>
                      Give your task a title:
                    </Typography>
                    {errors?.title && (
                      <Typography
                        customColor={Color.WARNING}
                      >{`Error: ${errors?.title?.message}`}</Typography>
                    )}
                    {/* Controller takes care of the registration process. */}
                    <Controller
                      control={control}
                      name="title"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                          fullWidth
                          defaultValue={props.title}
                          error={!!errors?.title ?? false}
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography customColor={Color.JET}>
                      About this task:
                    </Typography>
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                          fullWidth
                          multiline
                          defaultValue={props.description}
                          maxRows={14}
                          minRows={10}
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Box>
              <Container maxWidth="xs">
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item>
                    <Button
                      fullWidth
                      color="primary"
                      style={{
                        backgroundColor: Color.WHITE,
                        textTransform: 'none',
                      }}
                      variant="outlined"
                      onClick={onSubmitRemove}
                    >
                      <Typography customColor={Color.FRESH}>
                        Remove Task
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      style={{
                        backgroundColor: Color.FRESH,
                        textTransform: 'none',
                      }}
                      type="submit"
                      variant="contained"
                    >
                      <Typography customColor={Color.WHITE}>
                        Save Changes
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </form>
        </Box>
      </Container>
    );
  };
  return <Template pageName={'Edit Task'}>{renderContent()}</Template>;
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

export default UpdatePage;
export { getServerSideProps };
