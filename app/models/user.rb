class User < ApplicationRecord
  has_secure_password

  enum role: [:client, :instructor, :admin]

  validates :primary_email, confirmation: true, uniqueness: true, on: :create
  validates :first_name, :last_name, :address, :city, :state, :zip_code, presence: true, on: :create 
  validates :primary_email_confirmation, presence: true, on: :create

  has_one :client_account,  dependent: :destroy
  has_many :students, through: :client_account
  has_many :courses
  has_many :student_courses, through: :courses
 

  # def students_courses
  #   byebug
  #   if current_user.role == 'client'
  #     self.students.pluck(:student_courses)
end
