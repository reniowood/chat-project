class UsersController < ApplicationController
    def create
        user = User.create(email: params[:email], password: params[:password])
        if user && user.valid?
            head :ok
        else
            head :internal_server_error
        end
    end
end
