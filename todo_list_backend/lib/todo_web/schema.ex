defmodule TodoWeb.Schema do
  use Absinthe.Schema

  alias TodoWeb.Resolvers.Item

  # This is a macro that allows the ItemTypes to be used inside this module
  import_types(__MODULE__.ItemTypes)

  query do
    @desc "Get the list of todo items"
    field :todo_items, list_of(:todo_item) do
      resolve(&Item.resolve_list_items/3)
    end

    @desc "Get an individual todo item"
    field :todo_item, :todo_item do
      arg(:id, non_null(:id))
      resolve(&Item.resolve_item/3)
    end
  end

  mutation do
    @desc "Add a todo"
    field :create_todo_item, :todo_item do
      arg(:input, non_null(:create_todo_item_input))
      resolve(&Item.create_item/3)
    end

    @desc "Delete a todo"
    field :delete_todo_item, :todo_item do
      # This arg is the second argument passed to delete_item, %{id: id}
      arg(:id, non_null(:id))
      resolve(&Item.delete_item/3)
    end

    @desc "Update a todo"
    field :update_todo_item, :todo_item do
      # This arg is the second argument apssed to update_item, %{input: input}
      arg(:input, non_null(:update_todo_item_input))
      resolve(&Item.update_item/3)
    end

    # Technically could just use update todo item fo this but seems better to have it
    @desc "Mark a todo as done"
    field :update_todo_item_status, :todo_item do
      arg(:input, non_null(:update_todo_item_status_input))
      resolve(&Item.update_item_status/3)
    end
  end
end
