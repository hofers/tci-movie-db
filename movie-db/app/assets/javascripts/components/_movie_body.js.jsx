class MovieBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      genres: []
    };

    this.movieInfo = React.createRef();

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewReview = this.addNewReview.bind(this)
  }

  handleFormSubmit(email, date, name, movie_id, rating, comment) {
    let body = JSON.stringify({ review: { email: email, date: date, name: name, movie_id: movie_id, rating: rating, comment: comment } });

    fetch('/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => { return response.json() })
      .then((review) => {
        this.addNewReview(review)
      });

  }

  addNewReview(review) {
    this.setState({
      reviews: this.state.reviews.concat(review)
    })
  }

  componentDidMount() {
    fetch('/api/v1/reviews?movie_id=' + this.props.props.movie_id)
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ reviews: data }) });
  }

  render() {
    var reviews = this.state.reviews.map((review) => {
      return (
        <tr key={review.id}>
          <td>{review.rating}/4</td>
          <td>{review.comment}</td>
          <td>{review.date}</td>
          <td>{review.email}</td>
        </tr>
      );
    });
    console.log();
    return (
      <div className="container-fluid">
        <div className="right-float padding-all">
          <h1><a href="/">I aM a DB</a></h1>
          <h4>(of movie reviews)</h4>
        </div>
        <div className="container-fluid padding-top">
          <MovieInfo ref={this.movieInfo} id={this.props.props.movie_id} />
          {reviews == 0 ? <div className="padding-top">
            <p>Looks like there are no reviews for this movie yet. Maybe you should write one!</p>
          </div> : <div className="padding-top table-responsive"><table className="table table-striped"><thead><tr><th scope="col">Rating</th><th scope="col">Comment</th><th scope="col">Review Date</th><th scope="col">Posted by</th></tr></thead><tbody>{reviews}</tbody></table></div>}

          <AddReview handleFormSubmit={this.handleFormSubmit} movie_id={this.props.props.movie_id} movie={this.movieInfo} />
        </div>
      </div>
    )
  }
}

class MovieInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie_info: []
    }

    this.movie_id = props.id;
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/" + this.movie_id + "?api_key=5b7ba9c75a008a1ed6007d6e4cc1ffe8&language=en-US")
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ movie_info: data, genres: data["genres"] }) });

  }


  render() {
    var genres = this.state.genres ? this.state.genres.map((genre) => {
      if (genre.id == this.state.genres[this.state.genres.length - 1].id)
        return (
          <span key={genre.id}>{genre.name}</span>
        );

      return (
        <span key={genre.id}>{genre.name}, </span>
      );
    }) : null;

    return (
      <div className="padding-top">
        <h1 id="title">{this.state.movie_info["original_title"]}</h1>
        <h3>Originally released: {this.state.movie_info["release_date"]}</h3>
        <h4>Genre(s): {genres}</h4>
      </div>
    );
  }
}