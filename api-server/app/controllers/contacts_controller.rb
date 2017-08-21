class ContactsController < ApplicationController
    def index
        render json: user.users
    end

    def create
        contact_user = User.find_by_email(params[:email])
        if contact_user
            if user == contact_user
                head :not_acceptable
            else
                contact = Contact.create(owner_id: user.id, user_id: contact_user.id)
                if contact && contact.valid?
                    render json: user.users
                elsif contact.has_duplicate_contact?
                    head :conflict
                else
                    head :internal_server_error
                end
            end
        else
            head :not_found
        end
    end

    def destroy
        contact = Contact.where(owner_id: user.id, user_id: params[:id])
        contact.destroy
    end
end