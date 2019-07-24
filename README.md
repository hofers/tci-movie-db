# tci-movie-db
TCI Code Challenge - Movie Review Database

![screenshot](https://i.imgur.com/GdUVf4I.png)

## I aM a DB (of movie reviews)
This is repository for my TCI code challenge app, dubbed "I aM a DB". 

A live instance can be found at https://movies.seanhofer.com.

It's built using react-rails, with the front-end done fully in React with Bootstrap and the back-end in Ruby on Rails. This was my first time actually working on a Rails project and I found it quite fun!

All unit testing is done in Minitest. For UI testing I used Jest.

I used [The Movie DB](https://www.themoviedb.org/documentation/api?language=en)'s API for pulling movie info.

## Setup
In order to run a local instance of my application:

1. Clone the repo
2. `cd /tci-movie-db/movie-db`
3. `bin/rails server`
4. Open `localhost:3000` in browser

Tests can be run with `bin/rails test`
