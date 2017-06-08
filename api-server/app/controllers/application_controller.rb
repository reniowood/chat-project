class ApplicationController < ActionController::API
    before_action :authenticate_user

    def authenticate_user
        auth_headers = request.headers["Authorization"]
        unless is_valid_headers(auth_headers)
            head :unauthorized
        end
    end

    private 

    def is_valid_headers(auth_headers)
        if auth_headers.nil?
            return false
        end

        auth_headers = auth_headers.split
        auth_headers.length == 2 and auth_headers[0] == 'Token' and User.find_by_token(auth_headers[1])
    end
end
