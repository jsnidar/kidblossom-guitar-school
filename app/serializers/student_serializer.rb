class StudentSerializer < ActiveModel::Serializer
  attributes :id, :student_courses, :gender, :birth_date, :first_name, :last_name, :client_account_id, :formatted_birthdate, :full_name, :parent_name

  belongs_to :client_account
end
