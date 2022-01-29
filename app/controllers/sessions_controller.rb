class SessionsController < ApplicationController
  skip_before_action :authorized

  def get_current_user
    byebug
    render json: UserSerializer.new(current_user, include: [:client_account]).serializable_hash
    # retrieve a token and decode that token in order to get the current user
  end

  def login
    @user = User.find_by(primary_email: params[:primary_email])
    if @user && @user.authenticate(params[:password])
      @token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user, include: [:client_account]).serializable_hash, token: @token }, status: :ok
    else
      render json: { errors: ["Username and Password must match"] }, status: :unprocessable_entity

    end
  end
end