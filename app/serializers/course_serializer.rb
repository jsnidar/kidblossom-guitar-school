class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :start_date, :status, :setting

  belongs_to :user
  has_many :students
end
