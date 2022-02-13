class Course < ApplicationRecord
  enum name: [:group_lesson_30_min, :group_lesson_15_min, :private_lesson_30_min] unless method_defined?(:group_lesson_30_min?)
  enum meeting_day: [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday] unless method_defined?(:sunday?)
  enum status: [:current, :completed] unless method_defined?(:current?)
  enum setting: [:online, :in_person] unless method_defined?(:online?)
  enum level: [:step_one, :reading_book, :tunes_1, :tunes_2]unless method_defined?(:step_one?)

  validates :start_time, presence: true
  validates :name, numericality: { in: 0..2 }
  validates :meeting_day, numericality: { in: 0..6 }
  validates :status, numericality: { in: 0..1 }
  validates :setting, numericality: { in: 0..1 }
  validates :level, numericality: { in: 0..3 }
  validates_date :start_date
  
  
  belongs_to :user
  has_many :student_courses
  has_many :students, through: :student_courses

  def instructor_name
    "#{self.user.first_name.capitalize} #{self.user.last_name.capitalize}"
  end

  def instructor_id
    self.user.id 
  end

  def course_list_label
    "#{self.meeting_day[0,3].capitalize} #{self.start_time.strftime("%I:%M %p")} #{self.level.titleize} #{self.user.first_name[0, 1].capitalize} #{self.user.last_name.capitalize}"
  end

  def course_level
    self.level.titleize
  end
end
