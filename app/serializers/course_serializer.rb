class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :start_date, :status, :setting, :meeting_day, :instructor_name, :instructor_id, :course_list_label, :course_level, :students

  belongs_to :user
  has_many :student_courses
  has_many :students, through: :student_courses

end
