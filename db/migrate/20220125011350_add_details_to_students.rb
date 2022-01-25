class AddDetailsToStudents < ActiveRecord::Migration[6.1]
  def change
    add_column :students, :first_name, :string
    add_column :students, :last_name, :string
  end
end
