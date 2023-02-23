defmodule Todo.Repo.Migrations.CreateTodos do
  use Ecto.Migration

  def change do
    rename table(:item), to: table(:items)
  end
end
