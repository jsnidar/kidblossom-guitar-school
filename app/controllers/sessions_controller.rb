class SessionsController < ApplicationController
  skip_before_action :authorized

  def get_current_user
    
    if current_user
      # only returning information about the user
      if current_user.role == "admin"
        render json: { user: UserSerializer.new(user), token: @token}, status: :ok
      elsif current_user.role == "instructor"
        render json: { user: UserSerializer.new(user), token: @token}, status: :ok
      elsif current_user.role == "client"
        # the route to courses is different for clients
        render json: { user: UserSerializer.new(user), token: @token}, status: :ok
      end
    # retrieve a token and decode that token in order to get the current user
    end
  end

  def login
    @user = User.find_by(primary_email: params[:primary_email])
    if @user && @user.authenticate(params[:password])
      @token = encode_token({ user_id: @user.id })
      if @user.role == "admin"
        render json: { user: UserSerializer.new(user), token: @token}, status: :ok
      elsif @user.role == "instructor"
        render json: { user: UserSerializer.new(user), token: @token}, status: :ok
      elsif @user.role == "client"
        render json: { user: UserSerializer.new(user), token: @token}, status: :ok
      end
    else
      render json: { errors: ["Email and Password must match"] }, status: :unprocessable_entity
    end
  end

  private 

  def user
    @user
  end

  def users 
    User.all
  end

  def admin_instructors
    User.where(role: 1)
  end

  def admin_courses 
    Course.all
  end

  def all_students
    @user.students
  end

  def user_students
    @user.students
  end

  def instructor_courses
    @user.courses
  end

  


end

