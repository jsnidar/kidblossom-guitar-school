class AddDiscountToOrderItems < ActiveRecord::Migration[6.1]
  def change
    add_column :order_items, :discount, :integer
  end
end
