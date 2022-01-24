class CreateStudents < ActiveRecord::Migration[6.1]
  def change
    create_table :students do |t|
      t.integer :gender
      t.date :birthdate
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
