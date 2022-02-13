class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :full_name, :primary_email, :primary_phone, :address, :city, :state, :zip_code, :role, :client_account, :courses, :students

  has_one :client_account
  has_many :students, through: :client_account
  has_many :student_courses, through: :students 
  has_many :courses
  
end
