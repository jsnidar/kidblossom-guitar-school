class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.float :amount
      t.belongs_to :client_account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
