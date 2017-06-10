class UserChat < ApplicationRecord
    self.table_name = "users_chats"
    
    belongs_to :user
    belongs_to :chat
end
