class OrderSerializer < ActiveModel::Serializer
  attributes :id, :total
  has_one :client_account
end
