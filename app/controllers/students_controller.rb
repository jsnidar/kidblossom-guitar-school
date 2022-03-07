class StudentsController < ApplicationController

  before_action :set_student, only: [:show, :update, :destroy]

  def create
    if current_user.role == 'client'
      @student = @user.students.new(student_params)
      @student.client_account_id = @user.client_account.id
      if @student.save  
        render json: @student, status: :created
      else
        render json: @student.errors.full_messages, status: :unprocessable_entity
      end
    elsif current_user.role == 'admin' || current_user.role == 'instructor'
      client = ClientAccount.find_by(id: student_params[:client_account_id])
      @student = client.students.new(student_params)
      if @student.save  
        render json: @student, status: :created
      else
        render json: @student.errors.full_messages, status: :unprocessable_entity
      end
    else
      render json: current_user.errors.full_messages, status: :method_not_allowed
    end
  end

  def index
    if current_user.role == "admin" || current_user.role == "instructor"
      render json: Student.all
    elsif current_user.role == "client"
      render json: current_user.students
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end

  def show
    if current_user.role == 'client'
      @student = current_user.students.find_by(id: params[:id])
      if @student
        render json: @student
      else
        render json: current_user.errors.full_messages, status: :not_found
      end
    elsif current_user.role == 'admin' || current_user.role == 'instructor'
      @student = Student.find_by(id: params[:id])
      if @student
        render json: @student
      else
        render json: @student.errors.full_messages, status: :not_found
      end
    end
  end

  def update
    if @student.update(student_params)
      if current_user.role == "admin" || current_user.role == "instructor"
        render json: Student.all
      elsif current_user.role == "client"
        render json: current_user.students
      else
        render json: { errors: ['Method not allowed']}, status: :method_not_allowed
      end
    else
      render json: student.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @student.destroy
    render json: {}
  end

  private

  # I need to rethink this logic for admin and instructor roles
  def set_student
    if current_user.role == 'admin'
      @student = Student.find_by(id: params[:id])
    elsif current_user.role == "client"
      @student = current_user.students.find_by(id: params[:id])
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end

  def student_params
    params.require(:student).permit(
      :id,
      :first_name, 
      :last_name, 
      :birth_date,
      :gender,
      :client_account_id
    )
  end
end
