Rails.application.routes.draw do
  
  
  resources :student_courses
  resources :users do
    resources :client_acounts do
      resources :students
    end
    resources :courses do
      resources :user
    end
  end
  
  resources :client_accounts

  resources :students 
  
  resources :courses do
    resources :user
  end


  resources :instructors

  get "/get-current-user" => "sessions#get_current_user"
  post "/login" => "sessions#login" 
  # post "/instructors" => "instructors#create"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
