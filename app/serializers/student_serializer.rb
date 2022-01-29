class StudentSerializer
  include JSONAPI::Serializer
  attributes :gender, :birth_date, :first_name, :last_name

  belongs_to :client_account
end
