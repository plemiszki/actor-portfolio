Rails.application.routes.draw do

  root to: "pages#home"

  namespace :admin do
    get '/' => '/admin/events#index'
    resources :events, only: [:index, :show]
  end
end
