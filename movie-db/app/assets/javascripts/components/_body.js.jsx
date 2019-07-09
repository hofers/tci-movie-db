class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewReview = this.addNewReview.bind(this)
  }

  handleFormSubmit(email, date, movie_id, rating, comment) {
    let body = JSON.stringify({ review: { email: email, date: date, movie_id: movie_id, rating: rating, comment: comment } });

    fetch('http://localhost:3000/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => { return response.json() })
      .then((review) => {
        this.addNewReview(review)
      })

  }

  addNewReview(review) {
    this.setState({
      reviews: this.state.reviews.concat(review)
    })
  }

  componentDidMount() {
    fetch('/api/v1/reviews.json')
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ reviews: data }) });
  }

  render() {
    return (
      <div>
        <div>
          <h1>I aM a DB</h1>
          <h3>of movie reviews</h3>
        </div>
        <div>
          <AllReviews />
        </div>
        <AddReview handleFormSubmit={this.handleFormSubmit} />
      </div>
    )
  }
}