class ClientAccount < ApplicationRecord
  enum status: [:current, :delinquent, :suspended, :inactive]
  belongs_to :user
  has_many :students
  has_many :orders
  has_many :order_items, through: :orders 
end
