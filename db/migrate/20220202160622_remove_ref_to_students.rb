class RemoveRefToStudents < ActiveRecord::Migration[6.1]
  def change
    remove_reference :students, :course, null: false, foreign_key: true
  end
end
