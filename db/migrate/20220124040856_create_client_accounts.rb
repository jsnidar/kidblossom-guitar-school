class CreateClientAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :client_accounts do |t|
      t.boolean :recieve_notifications
      t.belongs_to :user, null: false, foreign_key: true
      t.float :balance

      t.timestamps
    end
  end
end
