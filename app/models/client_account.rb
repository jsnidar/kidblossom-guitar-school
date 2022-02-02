class ClientAccount < ApplicationRecord

  after_initialize :set_defaults

  enum status: [:current, :delinquent, :suspended, :inactive]
  belongs_to :user
  has_many :students

  def client_students
    self.students
  end
  

  def set_defaults
    self.balance = 0 if self.new_record?
    self.status = 0 if self.new_record?
  end
end
