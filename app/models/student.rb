class Student < ApplicationRecord
  belongs_to :client_account
  has_many :student_sections
  has_many :course_sections, through: :student_sections
end
