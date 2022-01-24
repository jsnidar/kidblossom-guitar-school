class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  has_one :item
  has_one :order
end
