class AuthenticationController < ApplicationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods

    def get_access_token
        authenticate_with_http_basic do |email, password|
            user = User.find_by_email(email)
            if user && user.authenticate(password)
                render json: { token: user.token } and return
            else
                head :unauthorized
            end
        end
        
        head :unauthorized
    end
end
