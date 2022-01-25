class CreateStudentSections < ActiveRecord::Migration[6.1]
  def change
    create_table :student_sections do |t|
      t.belongs_to :student, null: false, foreign_key: true
      t.belongs_to :course_section, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
