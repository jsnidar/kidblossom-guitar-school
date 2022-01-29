class ClientAccountSerializer
  include JSONAPI::Serializer
  attributes :balance, :id, :status, :receive_notifications

  belongs_to :user
  has_many :students

end
