class ChatsController < ApplicationController
    def index
        render json: { chats: Chat.find_by_user(user) }
    end
    
    def create
        chat = Chat.create

        UserChat.create(user_id: user.id, chat_id: chat.id)
        user_ids = params[:user_ids].filter { |user_id| User.find_by_id(user_id) }
        for user_id in user_ids
            UserChat.create(user_id: user_id, chat_id: chat.id)
        end

        render json: { chat_id: chat.id }
    end
    
    def show
        render json: { chat: Chat.find_by_id(params[:id]) }
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
        token = request.headers['Authorization'][1]
        @user ||= User.find_by_token(token)
    end
    helper_method :user
end
