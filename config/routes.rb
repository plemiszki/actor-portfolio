Rails.application.routes.draw do

  root to: "pages#home"
  get '/schedule' => 'pages#schedule'
  get '/gallery' => 'pages#gallery'

  namespace :admin do
    get '/', to: redirect('/admin/events')
    resources :events, only: [:index, :show]
    resources :episodes, only: [:index, :show]
  end

  namespace :api do
    resources :events, only: [:index, :create, :show, :update, :destroy]
    get '/events_past' => 'events#index_past'
    resources :episodes, only: [:index, :create, :show, :update, :destroy]
  end
end
