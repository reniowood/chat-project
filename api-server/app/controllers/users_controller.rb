class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]

    def create
        user = User.create(name: params[:name], email: params[:email], password: params[:password])
        if user && user.valid?
            render json: { id: user.id }
        elsif user.has_invalid_email?
            render json: { field: :email }, status: :bad_request
        elsif user.has_duplicate_email?
            head :conflict
        elsif user.has_empty_email?
            render json: { field: :email }, status: :bad_request
        elsif user.has_empty_name?
            render json: { field: :name }, status: :bad_request
        elsif user.has_empty_password?
            render json: { field: :password }, status: :bad_request
        elsif user.has_too_short_password?
            render json: { field: :password }, status: :bad_request
        else
            head :internal_server_error
        end
    end

    def show
        render json: user, only: [:id, :name, :email]
    end

    def update
        user.name = params[:name] if params[:name]
        user.save
    end

    def destroy
        user.destroy
    end

    def update_fcm_token
        user.fcm_token = params[:fcm_token]
        user.save
    end
end
