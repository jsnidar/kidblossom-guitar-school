class SessionsController < ApplicationController
  skip_before_action :authorized

  def get_current_user
    
    if current_user
      if current_user.role == 'admin'
        render json: { user: current_user, users: User.all, courses: Course.all, students: current_user.students, token: @token }
      else
        render json: { user: current_user, courses: current_user.courses, students: current_user.students, token: @token }
      end
    # retrieve a token and decode that token in order to get the current user
    end
  end

  def login
    @user = User.find_by(primary_email: params[:primary_email])
    if @user && @user.authenticate(params[:password])
      @token = encode_token({ user_id: @user.id })
      if @user.role == "admin"
        render json: { user: @user, users: User.all, courses: Course.all, students: @user.students, token: @token  }, status: :ok
      else
        render json: { user: @user, courses: @user.courses, students: @user.students, token: @token  }, status: :ok
      end
    else
      render json: { errors: ["Email and Password must match"] }, status: :unprocessable_entity
    end
  end
end