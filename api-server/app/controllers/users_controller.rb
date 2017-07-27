class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]

    def create
        user = User.create(name: params[:name], email: params[:email], password: params[:password])
        if user && user.valid?
            head :ok
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
        user = User.find_by_id(params[:id])
        render json: user, only: [:name, :email]
    end

    def update
        user = User.find_by_id(params[:id])
        user.name = params[:name] if params[:name]
        user.save
    end

    def destroy
        user = User.find_by_id(params[:id])
        user.destroy
    end

    def update_fcm_token
        user = User.find_by_id(params[:user_id])
        user.fcm_token = params[:fcm_token]
        user.save
    end
end
