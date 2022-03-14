class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def index
    if @user.role == 2
      users = User.all
      render json: {users: users}
    else 
      render json: { errors: ['Unauthorized']}, status: :unauthorized
    end
  end
  
  def create
    @user = User.new(user_params)
    @user.role = 0

    if @user.save
      @user.create_client_account(client_params)
      @token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user), token: @token }, status: :created
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @token = encode_token({ user_id: @user.id })
    render json: { user: UserSerializer.new(@user), token: @token }
  end

  def update
    if @user.update(update_user_params)
      @user.client_account.update(client_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(
        :id,
        :first_name, 
        :last_name, 
        :password, 
        :password_confirmation, 
        :primary_email_confirmation, 
        :primary_email, 
        :primary_phone, 
        :address, 
        :city, 
        :state, 
        :zip_code,
        :role
      )
    end
    def update_user_params
      params.require(:user).permit(
        :id,
        :first_name, 
        :last_name, 
        :primary_email_confirmation, 
        :primary_email, 
        :primary_phone, 
        :address, 
        :city, 
        :state, 
        :zip_code,
        :role
      )
    end

    def client_params
      params.require(:client_account).permit(:id, :receive_notifications)
    end
=begin
    params = {
      required: {
        permitted_attr_1: value_1,
        permitted_attr_2: value_2,
        permitted_attr_3: value_3
      }
    }
=end
end
