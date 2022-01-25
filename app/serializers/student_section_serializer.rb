class StudentSectionSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :student
  has_one :course_section
end
