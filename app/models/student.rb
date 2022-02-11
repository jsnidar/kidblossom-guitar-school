class Student < ApplicationRecord
  validates :first_name, :last_name, :gender, :client_account_id, presence: true
  validates :gender, numericality: { in: 0..1 }
  validates_date :birth_date, before: lambda { 5.years.ago }
  enum gender: [:female, :male]
  
  belongs_to :client_account
  has_many :student_courses
  has_many :courses, through: :student_courses
  has_many :instructors, through: :student_courses, source: :user

  def formatted_birthdate
    self.birth_date.strftime("%B %e, %Y")
  end

  def full_name
    "#{self.first_name.capitalize} #{self.last_name.capitalize}"
  end
end
