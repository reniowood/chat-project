class UserChat < ApplicationRecord
    self.table_name = "users_chats"
    
    belongs_to :users
    belongs_to :chats
end
