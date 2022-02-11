class StudentSerializer < ActiveModel::Serializer
  attributes :id, :gender, :birth_date, :first_name, :last_name, :client_account_id, :formatted_birthdate, :full_name

  belongs_to :client_account
end
