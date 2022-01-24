class CourseSectionSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :meeting_day, :start_time, :end_time, :status, :setting
  has_one :user
  has_one :course
end
