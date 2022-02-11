class CoursesController < ApplicationController

  before_action :set_course, only: [:show, :update, :destroy]

  def create
    if current_user.role == 'admin' || current_user.role == 'instructor'
      course = current_user.courses.new(course_params)
      if course.save  
        render json: course, status: :created
      else
        render json: course.errors.full_messages, status: :unprocessable_entity
      end
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end

  def index
    if current_user.role === 'admin'
      courses = Course.all
      render json: courses
    elsif current_user.role === 'instructor'
      courses = current_user.courses
      render json: courses 
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end

  def show
    if @course && (current_user.role == "admin" || current_user.courses.includes?(params[:id]))
        # logic for showing a course for a client account || current_user.students_courses.includes?(params[:id])
      render json: @course
    else
      render json: @course.errors.full_messages, status: :not_foundj
    end
  end

  def update
    if current_user.role == 'admin'
      if @course.update(course_params)
        render json: @course
      else
        render json: @course.errors.full_messages, status: :unprocessable_entity
      end
    elsif current_user.role == 'instructor' && current_user.courses.exists?(params[:id])
      if @course.update(course_params)
        render json: @course
      else
        render json: @course.errors.full_messages, status: :unprocessable_entity
      end
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end

  def destroy
    course.destroy
  end

  private

  def set_course
    @course = Course.find_by(id: params[:id])
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
