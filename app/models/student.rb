class Student < ApplicationRecord
  belongs_to :client_account
  has_many :course_sections
  has_many :courses, through: :course_sections
end
