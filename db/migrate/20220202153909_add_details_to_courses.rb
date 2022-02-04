class AddDetailsToCourses < ActiveRecord::Migration[6.1]
  def change
    add_column :courses, :start_date, :date
    add_column :courses, :end_date, :date
    add_column :courses, :meeting_day, :integer
    add_column :courses, :start_time, :time
    add_column :courses, :status, :integer
    add_column :courses, :setting, :integer
    add_reference :courses, :user, null: false, foreign_key: true
  end
end
