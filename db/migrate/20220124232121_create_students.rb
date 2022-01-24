class CreateStudents < ActiveRecord::Migration[6.1]
  def change
    create_table :students do |t|
      t.integer :gender
      t.date :birth_date
      t.belongs_to :client_account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
