class StudentCourse < ApplicationRecord
  belongs_to :student
  belongs_to :course
  accepts_nested_attributes_for :student
end
