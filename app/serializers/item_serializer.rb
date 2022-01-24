class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :price
end
