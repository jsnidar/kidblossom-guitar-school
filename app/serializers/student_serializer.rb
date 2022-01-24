class StudentSerializer < ActiveModel::Serializer
  attributes :id, :gender, :birthdate, :status
  has_one :user
end
