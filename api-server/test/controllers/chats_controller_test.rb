require 'test_helper'

class ChatsControllerTest < ActionDispatch::IntegrationTest
  test "show all chats belongs to a user" do
    user_1, user_2, user_3 = create_users()

    chat_1 = Chat.create(name: "chat 1", users: [user_1, user_3])
    chat_2 = Chat.create(name: "chat 2", users: [user_2, user_3])
    chat_3 = Chat.create(name: "chat 3", users: [user_1, user_2])

    check_chat_index_response(user_1, [chat_1, chat_3])
    check_chat_index_response(user_2, [chat_2, chat_3])
    check_chat_index_response(user_3, [chat_1, chat_2])
  end

  test "create a chat with users" do
    user_1, user_2, user_3 = create_users()

    post "/chats", headers: { "Authorization" => "Token #{user_1.token}" }, params: { user_ids: [user_2.id, user_3.id] }
    assert_response :success

    assert_equal 1, user_1.chats.length
    assert_equal 1, user_2.chats.length
    assert_equal 1, user_3.chats.length

    response_body = JSON.parse(@response.body)
    assert_equal user_1.chats[0].id, response_body['chat_id']
    assert_equal user_2.chats[0].id, response_body['chat_id']
    assert_equal user_3.chats[0].id, response_body['chat_id']
  end
  
  test "show a chat information by an id" do
    user_1, user_2, user_3 = create_users()
    chat_1 = Chat.create(name: "chat 1", users: [user_1, user_2, user_3])
    user_ids = chat_1.users.map { |user| user.id }
    
    get "/chats/#{chat_1.id}", headers: { "Authorization" => "Token #{user_1.token}" }
    assert_response :success

    response_body = JSON.parse(@response.body)
    assert_equal chat_1.to_json(only: [:id, :name]), response_body['chat']
    assert_equal user_ids, response_body['user_ids']
  end
  
  test "remove a chat by an id" do
    user_1, user_2, user_3 = create_users()
    chat_1 = Chat.create(name: "chat 1", users: [user_1, user_2, user_3])

    assert_not_nil Chat.find_by_id(chat_1.id)

    delete "/chats/#{chat_1.id}", headers: { "Authorization" => "Token #{user_1.token}" }
    assert_response :success

    assert_nil Chat.find_by_id(chat_1.id)
  end

  private

  def create_users()
    user_1 = User.create(name: "jinhkim", email: "reniowood@gmail.com", password: "1234")
    user_2 = User.create(name: "rylan", email: "rylan@email.net", password: "2345")
    user_3 = User.create(name: "anna", email: "anna@email.com", password: "qwer")

    return user_1, user_2, user_3
  end

  def check_chat_index_response(user, chats)
    get "/chats", headers: { "Authorization" => "Token #{user.token}" }
    assert_response :success

    response_body = JSON.parse(@response.body)
    response_chats = response_body['chats']
    assert_equal chats.length, response_chats.length
    for chat in chats
      assert_equal 1, response_chats.select { |response_chat| response_chat['id'] == chat.id } .length
    end
  end
end
