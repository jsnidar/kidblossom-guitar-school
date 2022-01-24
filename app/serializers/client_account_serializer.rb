class ClientAccountSerializer < ActiveModel::Serializer
  attributes :id, :recieve_notifications, :balance, :status
  has_one :user
end
