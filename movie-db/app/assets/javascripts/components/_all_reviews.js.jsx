class AllReviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      genres: []
    };
  }

  componentDidMount() {
    fetch('/api/v1/reviews')
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ reviews: data }) });
  }

  render() {
    var reviews = this.state.reviews.map((review) => {
      return (
        <tr key={review.id}>
          <td><a href={"/movies?id=" + review.movie_id}>{review.name}</a></td>
          <td>{review.rating}/4</td>
          <td>{review.comment}</td>
          <td>{review.date}</td>
          <td>{review.email}</td>
        </tr>
      );
    });
    return (
      <div className="container-fluid">
        <div className="right-float padding-all">
          <h1><a href="/">I aM a DB</a></h1>
          <h4>(of movie reviews)</h4>
        </div>
        <div className="container-fluid padding-top">
          <h2><a href="/">Browse Movies</a>&emsp;&emsp;Browse Reviews</h2>
          {reviews == 0 ? <div>
            <p>Looks like there are no reviews for this movie yet. Maybe you should write one!</p>
          </div> : <div className="table-responsive"><table className="table table-striped"><thead><tr><th scope="col">Title</th><th scope="col">Rating</th><th scope="col">Comment</th><th scope="col">Review Date</th><th scope="col">Posted by</th></tr></thead><tbody>{reviews}</tbody></table></div>}
        </div>
      </div>
    )
  }
}