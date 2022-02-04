class Course < ApplicationRecord
  enum name: [:group_lesson_30_min, :group_lesson_15_min, :private_lesson_30_min]
  enum meeting_day: [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]
  enum status: [:current, :completed]
  enum setting: [:online, :in_person]

  validates :start_time, presence: true
  validates :name, numericality: { in: 0..2 }
  validates :meeting_day, numericality: { in: 0..6 }
  validates :status, numericality: { in: 0..1 }
  validates :setting, numericality: { in: 0..1 }
  validates_date :start_date
  
  
  has_many :users
  has_many :student_courses
  has_many :students, through: :student_courses


end
