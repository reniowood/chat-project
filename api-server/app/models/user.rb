class User < ApplicationRecord
    has_secure_password
    has_secure_token
    
    validates :email, :password, presence: true
    validates_uniqueness_of :email
    validates_email_format_of :email
    validates :password, length: { minimum: 8 }

    has_many :user_chats
    has_many :chats, through: :user_chats

    def has_invalid_email?
        self.invalid? && self.errors.details[:email].any? { |error| error[:error] == :invalid_email_address }
    end

    def has_duplicate_email?
        self.invalid? && self.errors.details[:email].any? { |error| error[:error] == :taken }
    end

    def has_empty_email?
        self.invalid? && self.errors.details[:email].any? { |error| error[:error] == :blank }
    end

    def has_empty_password?
        self.invalid? && self.errors.details[:password].any? { |error| error[:error] == :blank }
    end

    def has_too_short_password?
        self.invalid? && self.errors.details[:password].any? { |error| error[:error] == :too_short }
    end
end
