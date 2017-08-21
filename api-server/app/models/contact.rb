class Contact < ApplicationRecord
    belongs_to :owner, class_name: 'User'
    belongs_to :user

    validates :owner, :user, presence: true
    validates_uniqueness_of :user, scope: [:owner]

    def has_duplicate_contact?
        self.invalid? && self.errors.details[:user].any? { |error| error[:error] == :taken }
    end
end