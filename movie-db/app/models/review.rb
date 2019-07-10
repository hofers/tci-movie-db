class Review < ApplicationRecord
  scope :movie_id, -> (movie_id) { where movie_id: movie_id }
  validates :name, :date, :email, :movie_id, :rating, presence: true
  validates :movie_id, :rating, numericality: { only_integer: true }
  validates :email, format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
end
