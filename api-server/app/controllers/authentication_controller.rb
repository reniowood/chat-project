class AuthenticationController < ApplicationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods

    skip_before_action :authenticate_user

    def get_token
        authenticate_with_http_basic do |email, password|
            user = User.find_by_email(email)
            if user && user.authenticate(password)
                render json: { id: user.id, token: user.token } and return
            else
                head :unauthorized
            end
        end
        
        head :unauthorized
    end
end
