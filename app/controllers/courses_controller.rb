class CoursesController < ApplicationController

  before_action :set_course, only: [:show, :update, :destroy]

  def index
    courses = Course.all
  end

  def create
    @course = @user.courses.new(course_params)
    if @course.save  
      @token = encode_token({ user_id: @user.id })
      render json: { course: @course, token: @token }, status: :created
    else
      render json: @course.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @course.update(course_params)
      render json: { course: @course, token: @token }
    else
      render json: @course.errors.full_messages, status: :unprocessable_entity
    end
  end


  def destroy
    @course.destroy
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(
        :name,
        :meeting_day,
        :start_date,
        :start_time,
        :status,
        :setting,
        :id,
        :user_id
      )
  end
end
