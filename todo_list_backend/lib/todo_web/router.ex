defmodule TodoWeb.Router do
  use TodoWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug Corsica, origins: "*"
  end

  pipeline :graphql do
    plug Corsica,
      origins: ["*"],
      log: [rejected: :error, invalid: :warn, accetped: :debug],
      allow_headers: :all,
      allow_credentials: true
  end

  scope "/api" do
    pipe_through :api

    forward "/graphql", Absinthe.Plug, schema: TodoWeb.Schema

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: TodoWeb.Schema,
      interface: :simple
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: TodoWeb.Telemetry
    end
  end
end
