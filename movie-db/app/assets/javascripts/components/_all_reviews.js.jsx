class AllReviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      movies: [],
      currentPage: 1,
      currentSort: 'original_title.desc',
      moviePage: [],
    };
  }

  componentDidMount() {
    this.getPageOfMovies(this.state.currentSort, this.state.currentPage);
  }

  changeSorts(sort) {
    this.getPageOfMovies(sort, this.state.currentPage);
  }

  nextPage(sort) {
    this.getPageOfMovies(sort, this.state.currentPage + 1);
  }

  lastPage(sort) {
    this.getPageOfMovies(sort, this.state.currentPage - 1);
  }

  getPageOfMovies(sort, page) {
    const DB_API_KEY = "5b7ba9c75a008a1ed6007d6e4cc1ffe8";

    this.state.currentPage = page;
    this.state.currentSort = sort;

    return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + DB_API_KEY + '&language=en-US&sort_by=' + sort + '&include_adult=false&include_video=false&page=' + page)
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ movies: data.results, moviePage: data }) });
  }

  render() {
    var movies = this.state.movies.map((movie) => {
      return (
        <tr key={movie.id}>
          <td>{movie.original_title}</td>
          <td>{movie.release_date}</td>
          <td>{movie.genre}</td>
        </tr>
      )
    })
    return (
      <div>
        <h2>Browse Movies</h2>

        <div>
          <select value="original_title.desc" onChange={(val) => { this.changeSorts(val) }}>
            <option value="original_title.desc">Alphabetical</option>
            <option value="release_date.desc">Release Date</option>
          </select>
        </div>
        <table>
          <tbody>{movies}</tbody>
        </table>
        <p>Page {this.state.currentPage} of {this.state.moviePage.total_pages}</p>

        {this.state.currentPage > 1 ?
          <button onClick={() => { this.lastPage(this.state.currentSort) }}>Previous Page</button> :
          <div></div>}

        {this.state.currentPage < this.state.moviePage.total_pages ?
          <button onClick={() => { this.nextPage(this.state.currentSort) }}>Next Page</button> :
          <div></div>}

      </div>
    )
  }
}