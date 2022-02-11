class InstructorSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :primary_email, :primary_phone, :address, :city, :state, :zip_code, :courses 

  has_many :courses
  has_many :student_courses, through: :courses 
  
  def full_name
    "#{self.first_name.titleize} #{self.last_name.titleize}"
  end
end
