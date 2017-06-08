require 'test_helper'
require 'base64'

class AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test "get a token" do
    user = User.create(name: "jinhkim", email: "reniowood@gmail.com", password: "1234")

    encoded_auth_header = Base64.encode64(user.email + ':' + user.password)
    get "/token", headers: { "Authorization" => "Basic " + encoded_auth_header }
    assert_response :success

    response_body = JSON.parse(@response.body)
    assert_equal user.token, response_body['token']
  end
end
