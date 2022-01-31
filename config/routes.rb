Rails.application.routes.draw do
  
  resources :student_sections
  resources :course_sections
  resources :courses
  resources :students
  resources :order_items
  resources :items
  resources :orders
  resources :client_accounts
  
  
  resources :users do
    resources :client_acounts do
      resources :students
    end
  end

  

  get "/get-current-user" => "sessions#get_current_user"
  post "/login" => "sessions#login"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
