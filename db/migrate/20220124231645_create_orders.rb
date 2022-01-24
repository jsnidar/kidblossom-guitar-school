class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.belongs_to :client_account, null: false, foreign_key: true
      t.float :total

      t.timestamps
    end
  end
end
