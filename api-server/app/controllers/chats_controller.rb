class ChatsController < ApplicationController
    def index
        render json: { chats: user.chats }
    end
    
    def create
        user_ids = params[:user_ids]
        if user_ids.nil? or user_ids.empty?
            head :bad_request and return
        end
        
        users = [user] + user_ids.map { |user_id| User.find_by_id(user_id) } .reject { |user| user.nil? }
        chat_name = create_chat_name(users)
        
        chat = Chat.create(name: chat_name)
        users.map do |user|
            user.chats << chat
            user.save!
        end

        render json: { chat_id: chat.id }
    end
    
    def show
        chat = Chat.find_by_id(params[:id])
        user_ids = chat.users.map { |user| user.id }
        messages = chat.get_messages
        render json: {
            chat: chat.to_json(only: [:id, :name]),
            user_ids: user_ids,
            messages: messages
        }
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

    def create_chat_name(users)
        "#{users.map(&:name).join(", ")}의 채팅방"
    end
end
