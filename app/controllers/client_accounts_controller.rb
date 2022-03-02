class ClientAccountsController < ApplicationController

  def index
    if current_user.role == "admin" || current_user.role == "instructor"
      render json: ClientAccount.all
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end
end
