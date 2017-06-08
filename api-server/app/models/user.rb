class User < ApplicationRecord
    has_secure_password
    has_secure_token
    
    validates_uniqueness_of :email

    has_many :user_chats
    has_many :chats, through: :user_chats
end
