class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :start_date, :status, :setting, :meeting_day

  belongs_to :user
  has_many :students
end
