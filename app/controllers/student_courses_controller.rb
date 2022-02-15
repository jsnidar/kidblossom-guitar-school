class StudentCoursesController < ApplicationController
  before_action :set_student_course, only: [:show, :update, :destroy]

  def create
    @student_course = @user.student_courses.new(student_course_params)
    if @student_course.save  
      @token = encode_token({ user_id: @user.id })
      render json: { student_course: @student_course, token: @token }, status: :created
    else
      render json: @student_course.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @student_course.update(student_course_params)
      render json: { student_course: @student_course, token: @token }
    else
      render json: @student_course.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @student_course.destroy
  end

  private

  # I need to rethink this logic for admin and instructor roles
  def set_student_course
    @student_course = @user.student_courses.find(params[:id])
  end

  def student_course_params
    params.require(:student_course).permit(
        :student_id,
        :user_id
      )
  end
end
