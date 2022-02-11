class InstructorsController < ApplicationController

  def create
    if current_user.role == 'admin'
      @instructor = User.new(create_instructor_params)
      @instructor.role = 1

      if @instructor.save
        render json: InstructorSerializer.new(@instructor), status: :created

      else
        render json: @instructor.errors.full_messages, status: :unprocessable_entity
      end
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end

  def index
    if current_user.role == "admin"
      render json: InstructorSerializer.new(User.where(role: "instructor"))
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end

  def show
    @instructor = User.find_by(id: params[:id])
    if @instructor
      if current_user.role == "admin" || current_user == @instructor
      render json: InstructorSerializer.new(@instructor)
    else
      render json: @instructor.errors.full_messages, status: :not_foundj
    end
  end

  def update
    @instructor = User.find_by(id: params[:id])
    if @instructor.update(update_instructor_params)
      render json: InstructorSerializer.new(@instructor)
    else
      render json: @instructor.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    if current_user.role == 'admin'
      Instructor.find(params[:id]).destroy
    else
      render json: { errors: ['Method not allowed']}, status: :method_not_allowed
    end
  end

  private 

  def create_instructor_params
    params.require(:instructor).permit(
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
      :zip_code
    )
  end

  def update_instructor_params
    params.require(:instructor).permit(
      :id,
      :first_name, 
      :last_name, 
      :primary_phone, 
      :address, 
      :city, 
      :state, 
      :zip_code
    )
  end
end
