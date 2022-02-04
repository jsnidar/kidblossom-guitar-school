class AddRefToStudents < ActiveRecord::Migration[6.1]
  def change
    add_reference :students, :course, null: false, foreign_key: true
  end
end
