class CreateStudentCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :student_courses do |t|
      t.belongs_to :student, null: false, foreign_key: true
      t.belongs_to :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
