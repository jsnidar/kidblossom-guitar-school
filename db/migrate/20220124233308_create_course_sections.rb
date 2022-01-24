class CreateCourseSections < ActiveRecord::Migration[6.1]
  def change
    create_table :course_sections do |t|
      t.date :start_date
      t.date :end_date
      t.integer :meeting_day
      t.time :start_time
      t.time :end_time
      t.integer :status
      t.integer :setting
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
