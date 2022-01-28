class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
  def create
    @user = User.new(user_params)

    if @user.save
      @token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: @token }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(
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
        :zip_code
      )

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
