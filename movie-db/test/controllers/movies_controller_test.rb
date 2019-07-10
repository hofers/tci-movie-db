class MoviesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @random = rand(99999)
  end
  test 'assert_react_component' do
    get "/movies?id=#{@random}"
    assert_react_component "Movie" do |props|
      assert_equal @random.to_s, props[:movie_id]
    end
  end
end