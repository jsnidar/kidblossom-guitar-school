class User < ApplicationRecord
  enum role: [:client, :instructor, :admin]
  has_one :client_account
end
