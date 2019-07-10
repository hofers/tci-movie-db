class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="right-float padding-all">
          <h1><a href="/">I aM a DB</a></h1>
          <h4>(of movie reviews)</h4>
        </div>
        <div>
          <AllMovies />
        </div>
      </div>
    )
  }
}