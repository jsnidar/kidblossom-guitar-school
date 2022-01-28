class User < ApplicationRecord
  has_secure_password
  
  enum role: [:client, :instructor, :admin]
  has_one :client_account
  has_many :course_sections
end
