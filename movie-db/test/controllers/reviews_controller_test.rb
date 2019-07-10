class ReviewsControllerTest < ActionDispatch::IntegrationTest
  test 'assert_react_component' do
    get "/reviews"
    assert_react_component "AllReviews"
  end
end