class User < ApplicationRecord
  belongs_to :user_type
  enum role: [:client, :instructor, :admin]
  has_one :client_account
  has_many :students, through: :client_account
end
