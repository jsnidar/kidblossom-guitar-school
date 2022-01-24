class ClientAccount < ApplicationRecord
  belongs_to :user
  has_many :students through: :user
end
