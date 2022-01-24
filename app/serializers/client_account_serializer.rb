class ClientAccountSerializer < ActiveModel::Serializer
  attributes :id, :recieve_notifications, :balance
  has_one :user
end
