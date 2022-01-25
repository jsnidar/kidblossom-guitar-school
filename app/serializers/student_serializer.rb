class StudentSerializer < ActiveModel::Serializer
  attributes :id, :gender, :birth_date
  has_one :client_account
  has_many :student_sections
  has_many :course_sections, through: :student_sections
end
