class Api::V1::ReviewsController < ApplicationController
  def index
    render json: Review.all
  end
  def create
    review = Review.create(review_params)
    render json: review
  end
  def destroy
    Review.destroy(params[:id])
  end
  def update
    review = Review.find(params[:id])
    Review.update_attributes(review_params)
    render json: review
  end
  private
  def review_params
    params.require(:review).permit(:movie_id, :email, :date, :rating, :comment)
  end
end