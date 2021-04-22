require 'test_helper'

class PassagensControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get passagens_index_url
    assert_response :success
  end

end
