class CreateJoinTableUserChat < ActiveRecord::Migration[5.1]
  def change
    create_table :users_chats do |t|
      t.belongs_to :user, index: true
      t.belongs_to :chat, index: true
      t.timestamp
    end
  end
end
