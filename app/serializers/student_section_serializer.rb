class StudentSectionSerializer < ActiveModel::Serializer
  attributes :id
  has_one :student
  has_one :course_section
end
