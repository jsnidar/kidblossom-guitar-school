class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :primary_email
      t.string :primary_phone
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.integer :role

      t.timestamps
    end
  end
end
