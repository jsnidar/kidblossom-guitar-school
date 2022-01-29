class CreateClientAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :client_accounts do |t|
      t.boolean :receive_notifications
      t.float :balance
      t.integer :status
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
