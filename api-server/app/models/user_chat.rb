class UserChat < ApplicationRecord
    belongs_to :users
    belongs_to :chats
end
