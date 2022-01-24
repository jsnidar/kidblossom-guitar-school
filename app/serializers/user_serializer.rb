class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :password_digest, :primary_email, :primary_phone, :address, :city, :state, :zip_code
  has_one :user_type
end
