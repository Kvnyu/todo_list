defmodule TodoWeb.Schema.ItemTypes do
  use Absinthe.Schema.Notation

  # Object types
  object :todo_item do
    field :id, :id

    field :completed, :boolean
    field :description, :string
    field :title, :string
  end

  # Input types

  input_object :create_todo_item_input do
    field :title, non_null(:string)

    field :completed, :boolean
    field :description, :string
  end

  input_object :update_todo_item_input do
    field :id, non_null(:id)

    field :item, non_null(:create_todo_item_input)
  end

  input_object :update_todo_item_status_input do
    field :id, non_null(:id)

    field :completed, non_null(:boolean)
  end
end
