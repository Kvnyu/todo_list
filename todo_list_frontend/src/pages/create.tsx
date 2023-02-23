import React, { FC } from 'react';
// Modules
import { useRouter } from 'next/router';
// Hooks
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Modules
import * as yup from 'yup';
// MUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
// FUI
import Typography from '../theme/overrides/Typography';
// Components
import Template from '../components/template/Template';
import TextField from '../theme/overrides/TextField';
// GraphQL
import { useMutation } from '@apollo/client/react';
import CreateTodoItemMutation, {
  CreateTodoItemMutationData,
  CreateTodoItemMutationVariables,
} from '../lib/graphql/mutation/CreateTodoListMutation.graphql';
// Styles
import { Color } from '../theme/theme';
// Lib
import paths from '../lib/paths';

interface CreateTodoFormData {
  description?: string;
  title: string;
}
const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
});
const CreatePage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTodoFormData>({
    resolver: yupResolver(validationSchema),
  });

  const [createTodo] = useMutation<
    CreateTodoItemMutationData,
    CreateTodoItemMutationVariables
  >(CreateTodoItemMutation);

  const router = useRouter();

  const onSubmit = async (data: CreateTodoFormData) => {
    createTodo({
      variables: {
        input: {
          description: data.description,
          title: data.title,
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

  return (
    <Template pageName="Create new task">
      <Container disableGutters maxWidth="md">
        <Box bgcolor={Color.WHITE} borderRadius="8px" minHeight="720px" mt={2}>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <IconButton href={paths.home.href}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
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

                    <TextField
                      fullWidth
                      error={!!errors?.title ?? false}
                      {...register('title', { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography customColor={Color.JET}>
                      About this task:
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={14}
                      minRows={10}
                      {...register('description', { required: true })}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth="xs">
              <Box p={2}>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: Color.FRESH,
                    textTransform: 'none',
                  }}
                  type="submit"
                >
                  <Typography customColor={Color.WHITE}>Create Task</Typography>
                </Button>
              </Box>
            </Container>
          </form>
        </Box>
      </Container>
    </Template>
  );
};

export default CreatePage;
