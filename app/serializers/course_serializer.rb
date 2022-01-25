class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :course_sections
end
