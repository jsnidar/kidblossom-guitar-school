class AddPurchaseDateToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :purchase_date, :date
  end
end
