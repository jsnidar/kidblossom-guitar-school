class Course < ApplicationRecord
  has_many :course_sections
  has_many :users, through: :course_sections
  has_many :students, through: :course_sections
end
