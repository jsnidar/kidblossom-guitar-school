class Student < ApplicationRecord
  validates :first_name, :last_name, :gender, :client_account_id, presence: true
  validates :gender, numericality: { in: 0..1 }
  validates_date :birth_date, before: lambda { 5.years.ago }
  enum gender: [:female, :male]
  
  belongs_to :client_account
  has_many :student_sections
  has_many :course_sections, through: :student_sections
  has_many :instructors, through: :student_sections, source: :user
end
