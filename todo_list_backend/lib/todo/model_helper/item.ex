defmodule Todo.ModelHelper.Item do
  alias Todo.Model.Item
  alias Todo.Repo

  # We make these helper functions to add safety to our db access
  # It provides an interface for us to interact with db
  # Otherwise there if we access it in a lot of places in code we might be doing all sorts of things

  def create_item(data) do
    %Item{}
    |> Item.changeset(data)
    |> Repo.insert()
  end

  def delete_item(item) do
    item
    |> Repo.delete()
  end

  def get_item(id) do
    Repo.get(Item, id)
  end

  def get_item!(id) do
    Repo.get!(Item, id)
  end

  def get_item_list do
    Repo.all(Item)
  end

  def update_item(item, params \\ %{}) do
    item
    |> Item.changeset(params)
    |> Repo.update()
  end
end
