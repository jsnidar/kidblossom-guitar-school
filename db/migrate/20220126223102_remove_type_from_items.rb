class RemoveTypeFromItems < ActiveRecord::Migration[6.1]
  def change
    remove_column :items, :type, :integer
  end
end
