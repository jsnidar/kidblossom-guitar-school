class StudentSection < ApplicationRecord
  belongs_to :student
  belongs_to :course_section
  belongs_to :user
end
