require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "create a user" do
    post "/users", params: { name: "jinhkim", email: "reniowood@gmail.com", password: "1234" }
    assert_response :success
  end
  
  test "get a user information" do
    user = User.create(name: "jinhkim", email: "reniowood@gmail.com", password: "1234")

    get "/users/#{user.id}", headers: { "Authorization" => "Token #{user.token}" }
    assert_response :success

    response_body = JSON.parse(@response.body)
    assert_equal "jinhkim", response_body["name"]
    assert_equal "reniowood@gmail.com", response_body["email"]
  end
  
  test "delete a user" do
  end
end
