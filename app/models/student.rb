class Student < ApplicationRecord
  enum gender: [:female, :male]
  
  belongs_to :client_account
  has_many :student_sections
  has_many :course_sections, through: :student_sections
  has_many :instructors, through: :student_sections, source: :user
end
