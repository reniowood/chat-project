class AddFcmTokenToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :fcm_token, :string
  end
end
