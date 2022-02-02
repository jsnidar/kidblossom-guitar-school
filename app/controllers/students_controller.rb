class StudentsController < ApplicationController

  before_action :set_student, only: [:show, :update, :destroy]

  def create
    @student = @user.students.new(student_params)
    if @student.save  
      @token = encode_token({ user_id: @user.id })
      render json: { student: @student, token: @token }, status: :created
    else
      render json: @student.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @student.update(student_params)
      render json: { student: @student, token: @token }
    else
      render json: @student.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @student.destroy
  end

  private

  def set_student
    @student = @user.students.find(params[:id])
  end

  def student_params
    params.require(:student).permit(
        :first_name, 
        :last_name, 
        :birth_date,
        :gender,
        :client_account_id
      )
    end
end
