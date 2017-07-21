class ContactsController < ApplicationController
    def index
        render json: User.find(params[:user_id]).users, only: [:id, :name, :email]
    end

    def create
        Contact.create(owner_id: params[:user_id], user_id: params[:id])
    end

    def destroy
        contact = Contact.where(owner_id: params[:user_id], user_id: params[:id])
        contact.destroy
    end
end