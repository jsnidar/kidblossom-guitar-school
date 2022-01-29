class User < ApplicationRecord
  has_secure_password

  enum role: [:client, :instructor, :admin]

  validates :primary_email, confirmation: true, uniqueness: true
  validates :first_name, :last_name, :primary_email_confirmation, :address, :city, :state, :zip_code, presence: true

  has_one :client_account
  has_many :course_sections
end
