class Chat < ApplicationRecord
    has_many :user_chats
    has_many :users, through: :user_chats

    def send_message(message)
    end
end
