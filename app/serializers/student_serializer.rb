class StudentSerializer < ActiveModel::Serializer
  attributes :id, :gender, :birth_date
  has_one :client_account
end
