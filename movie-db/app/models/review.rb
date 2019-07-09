class Review < ApplicationRecord
  scope :movie_id, -> (movie_id) { where movie_id: movie_id }
end
