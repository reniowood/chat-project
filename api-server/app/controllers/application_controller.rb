class ApplicationController < ActionController::API
    before_action :authenticate_user

    def authenticate_user
        user_id = params[:id]
        auth_headers = request.headers["Authorization"]
        unless is_valid_headers(auth_headers, user_id)
            head :unauthorized
        end
    end

    private 

    def is_valid_headers(auth_headers, user_id)
        if auth_headers.nil?
            return false
        end

        auth_headers = auth_headers.split
        user = User.find_by_id(user_id)
        auth_headers.length == 2 and auth_headers[0] == 'Token' and user and user.token == auth_headers[1]
    end
end
