class Api::V1::ReviewsController < ApplicationController
  def index
    if (params[:movie_id] != nil)
      render json: Review.movie_id(params[:movie_id]) 
    else
      render json: Review.all
    end
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
    params.require(:review).permit(:movie_id, :email, :name, :date, :rating, :comment)
  end
end