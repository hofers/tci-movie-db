class Movies::MoviesController < ApplicationController
  def index
    @movie_id = params[:id];
  end
end