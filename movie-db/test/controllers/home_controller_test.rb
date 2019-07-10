class HomeControllerTest < ActionDispatch::IntegrationTest
  test 'assert_react_component' do
    get "/"
    assert_react_component "Main"
  end
end