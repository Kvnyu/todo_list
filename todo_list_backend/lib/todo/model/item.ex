defmodule Todo.Model.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field :completed, :boolean, default: false
    field :description, :string
    field :title, :string

    # This is a macro that automatically generates the :inserted_at and :updated_at timestamp fields
    timestamps()
  end

  @optional_fields ~w(description completed)a
  @required_fields ~w(title)a

  def changeset(data, params \\ %{}) do
    data
    |> cast(params, @optional_fields ++ @required_fields)
    |> validate_required(@required_fields)
  end
end
