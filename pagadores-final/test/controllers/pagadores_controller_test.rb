require 'test_helper'

class PagadoresControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pagadores_index_url
    assert_response :success
  end

end
