class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]

    def create
        user = User.create(name: params[:name], email: params[:email], password: params[:password])
        if user && user.valid?
            head :ok
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
end
