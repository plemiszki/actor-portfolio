Rails.application.routes.draw do

  root to: "pages#home"
  get '/schedule' => 'pages#schedule'
  get '/gallery' => 'pages#gallery'

  namespace :admin do
    get '/' => '/admin/events#index'
    resources :events, only: [:index, :show]
  end

  namespace :api do
    resources :events, only: [:index, :create, :show, :update, :destroy]
  end
end
