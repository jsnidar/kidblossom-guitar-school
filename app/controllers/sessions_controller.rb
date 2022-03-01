class SessionsController < ApplicationController
  skip_before_action :authorized

  def get_current_user
    
    if logged_in?
      render json: { user: UserSerializer.new(@user), token: @token}, status: :ok
    else
      render json: user.errors.full_messages
    end
  end

  def login
    @user = User.find_by(primary_email: params[:primary_email])
    if @user && @user.authenticate(params[:password])
      @token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user), token: @token}, status: :ok
    else
      render json: { errors: ["Email and Password must match"] }, status: :unprocessable_entity
    end
  end

end

