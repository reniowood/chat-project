class ChatsController < ApplicationController
    def index
        render json: { chats: user.chats }
    end
    
    def create
        chat = Chat.create
        chat.users = [user] + params[:user_ids].map { |user_id| User.find_by_id(user_id) } .reject { |user| user.nil? }

        render json: { chat_id: chat.id }
    end
    
    def show
        chat = Chat.find_by_id(params[:id])
        user_ids = chat.users.map { |user| user.id }
        render json: { chat: chat.to_json(only: [:id, :name]), user_ids: user_ids }
    end
    
    def update
        chat = Chat.find_by_id(params[:id])
        result = chat.send_message(user.id, params[:msg])

        head :ok
    end
    
    def destroy
        chat = Chat.find_by_id(params[:id])
        chat.destroy

        head :ok
    end

    private

    def user
        token = request.headers['Authorization'].split[1]
        @user ||= User.find_by_token(token)
    end
    helper_method :user
end
