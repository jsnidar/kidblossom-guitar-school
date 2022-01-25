class CourseSection < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :students
  has_many :client_accounts, through: :students
  
end
