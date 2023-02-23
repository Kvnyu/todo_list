defmodule Todo.Repo.Migrations.CreateTodos do
  use Ecto.Migration

  def change do
    create table(:item) do
      add :completed, :boolean
      add :description, :string
      add :title, :string

      timestamps()
    end
  end
end
