require 'test_helper'

class ReviewTest < ActiveSupport::TestCase

  def setup 
    @review = Review.new(movie_id: 55245, email: "me@seanhofer.com", date: Date.new(2019,7,7), name: "!Women Art Revolution", rating: 3, comment: "pretty good")
  end

  test "valid review with comment" do
    assert @review.valid?
  end

  test "valid review without comment" do
    @review.comment = nil
    assert @review.valid?
  end

  test "review missing email" do
    @review.email = nil
    refute @review.valid?, "review is valid without email"
    assert_not_nil @review.errors[:email], "no validation error for email"
  end

  test "review missing movie_id" do
    @review.movie_id = nil
    refute @review.valid?, "review is valid without movie_id"
    assert_not_nil @review.errors[:movie_id], "no validation error for movie_id"
  end

  test "review missing date" do
    @review.date = nil
    refute @review.valid?, "review is valid without date"
    assert_not_nil @review.errors[:date], "no validation error for date"
  end

  test "review missing rating" do
    @review.rating = nil
    refute @review.valid?, "review is valid without rating"
    assert_not_nil @review.errors[:rating], "no validation error for rating"
  end

  test "review missing name" do
    @review.name = nil
    refute @review.valid?, "review is valid without name"
    assert_not_nil @review.errors[:name], "no validation error for name"
  end

  test "date is incorrect format" do
    @review.date = "string"
    refute @review.valid?, "review is valid with incorrect date format"
    assert_not_nil @review.errors[:date], "no validation error for date"
  end

  test "movie_id is not an int" do
    @review.movie_id = "string"
    refute @review.valid?, "review is valid with incorrect movie_id type"
    assert_not_nil @review.errors[:movie_id], "no validation error for movie_id"
  end

  test "rating is not an int" do
    @review.rating = "string"
    refute @review.valid?, "review is valid with incorrect rating type"
    assert_not_nil @review.errors[:rating], "no validation error for rating"
  end

  test "email is not formatted correctly" do
    @review.rating = "string"
    refute @review.valid?, "review is valid with incorrect email formatting"
    assert_not_nil @review.errors[:email], "no validation error for email"
  end
end
