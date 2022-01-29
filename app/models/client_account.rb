class ClientAccount < ApplicationRecord
  after_initialize :set_defaults
  enum status: [:current, :delinquent, :suspended, :inactive]
  belongs_to :user
  has_many :students
  has_many :orders
  has_many :order_items, through: :orders 

  def set_defaults
    self.balance = 0 if self.new_record?
    self.status = 0 if self.new_record?
  end
end
