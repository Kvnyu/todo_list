defmodule TodoWeb.Resolvers.Item do
  alias Todo.ModelHelper

  def resolve_list_items(_, _, _) do
    {:ok, ModelHelper.Item.get_item_list()}
  end

  def resolve_item(_, %{id: id}, _) do
    {:ok, ModelHelper.Item.get_item(id)}
  end

  # A resolver accepts 3 arguments
  # Parent - E.g when title is being resolved, the parent is the :todo_item
  # Args - the args passed into the query/mutation
  # Context - used to pass data to the resolver. Context is set in the call to Absinthe.run/3
  def create_item(_, %{input: attrs}, _) do
    ModelHelper.Item.create_item(attrs)
    |> case do
      {:ok, item} -> {:ok, item}
      # Feels like we should return the changeset errors here ... will required more code tho
      {:error, _changeset} -> {:error, "Failed to create item"}
    end
  end

  def delete_item(_, %{id: id}, _) do
    with {:get_item, item} when not is_nil(item) <- {:get_item, ModelHelper.Item.get_item(id)},
         {:delete_item, {:ok, struct}} <- {:delete_item, ModelHelper.Item.delete_item(item)} do
      {:ok, struct}
    else
      {:get_item, _} -> {:error, "Could not get item"}
      {:delete_item, _} -> {:error, "Could not delete item"}
    end
  end

  def update_item(_, %{input: %{id: id, item: updated_item}}, _) do
    with {:get_item, item} when not is_nil(item) <- {:get_item, ModelHelper.Item.get_item(id)},
         {:update_item, item} <- {:update_item, ModelHelper.Item.update_item(item, updated_item)} do
      item
    else
      {:get_item, _} -> {:error, "Could not get item"}
      {:update_item, _} -> {:error, "Could not update item"}
    end
  end

  def update_item_status(_, %{input: attrs}, _) do
    %{id: id, completed: completed} = attrs

    with {:get_item, item} when not is_nil(item) <- {:get_item, ModelHelper.Item.get_item(id)},
         {:update_item, item} <-
           {:update_item, ModelHelper.Item.update_item(item, %{completed: completed})} do
      item
    else
      {:get_item, _} -> {:error, "Could not get item"}
      {:update_item, _} -> {:error, "Could not update item status"}
    end
  end
end
