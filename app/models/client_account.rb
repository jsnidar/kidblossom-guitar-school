class ClientAccount < ApplicationRecord
  enum status: [:current, :delinquent, :suspended, :inactive]
  belongs_to :user
end
