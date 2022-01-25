class StudentSection < ApplicationRecord
  belongs_to :user
  belongs_to :student
  belongs_to :course_section
end
