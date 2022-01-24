# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

10.times do |i| 
  User.create!(
    first_name: Faker::Name.unique.first_name, 
    last_name: Faker::Name.unique.last_name,
    primary_email: Faker::Internet.safe_email,
    primary_phone: Faker::PhoneNumber.phone_number,
    address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip_code: Faker::Address.zip_code,
    role: 0
 )
end
