class ClientAccount < ApplicationRecord

  after_initialize :set_defaults

  enum status: [:current, :delinquent, :suspended, :inactive]
  belongs_to :user
  has_many :students
  has_many :student_courses, through: :students
  has_many :courses, through: :student_courses
  has_many :instructors, through: :student_courses, source: :user

  def client_students
    self.students
  end
  

  def set_defaults
    self.balance = 0 if self.new_record?
    self.status = 0 if self.new_record?
  end
end
