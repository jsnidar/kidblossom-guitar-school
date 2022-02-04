class RemoveEndDateFromCourses < ActiveRecord::Migration[6.1]
  def change
    remove_column :courses, :end_date, :date
  end
end
