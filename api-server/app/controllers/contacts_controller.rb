class ContactsController < ApplicationController
    def index
        render json: user.users, only: [:id, :name, :email]
    end

    def create
        Contact.create(owner_id: user.id, user_id: params[:id])
    end

    def destroy
        contact = Contact.where(owner_id: user.id, user_id: params[:id])
        contact.destroy
    end
end