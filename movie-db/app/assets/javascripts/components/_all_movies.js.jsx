class AllMovies extends React.Component {

  constructor(props) {
    super(props);
    this.DB_API_KEY = "5b7ba9c75a008a1ed6007d6e4cc1ffe8";

    this.sort = React.createRef();
    this.genre = React.createRef();

    this.state = {
      reviews: [],
      movies: [],
      genres: [],
      currentPage: 1,
      currentSort: 'original_title.asc',
      moviePage: [],
    };
  }

  componentDidMount() {

    var genreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=";

    fetch(genreURL + this.DB_API_KEY)
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ genres: data.genres }) });

    this.getPageOfMovies(this.state.currentSort, this.state.currentPage, this.genre.current.value);
  }

  changeSorts() {
    this.getPageOfMovies(this.sort.current.value, this.state.currentPage, this.genre.current.value);
  }

  nextPage(sort) {
    this.getPageOfMovies(sort, this.state.currentPage + 1, this.genre.current.value);
  }

  lastPage(sort) {
    this.getPageOfMovies(sort, this.state.currentPage - 1, this.genre.current.value);
  }

  getPageOfMovies(sort, page, genre) {
    this.state.currentPage = page;
    this.state.currentSort = sort;

    return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + this.DB_API_KEY + '&language=en-US&sort_by=' + sort + '&include_adult=false&include_video=false&page=' + page + genre)
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ movies: data.results, moviePage: data }) });
  }

  render() {
    var movies = this.state.movies.map((movie) => {
      var movieGenres = movie.genre_ids.map((genre_id) => {
        if (genre_id == movie.genre_ids[movie.genre_ids.length - 1])
          return (
            <span key={genre_id}>{this.state.genres.find((genre) => genre.id == genre_id).name}</span>
          );

        return (
          <span key={genre_id}>{this.state.genres.find((genre) => genre.id == genre_id).name}, </span>
        );
      });

      return (
        <tr key={movie.id}>
          <td><a href={"/movies?id=" + movie.id}>{movie.original_title}</a></td>
          <td>{movie.release_date}</td>
          <td>{movieGenres}</td>
        </tr>
      )
    });

    var genres = this.state.genres.map((genre) => {
      return (
        <option key={genre.id} value={"&with_genres=" + genre.id}>{genre.name} </option>
      )
    });

    return (
      <div className="container-fluid padding-top">
        <h2>Browse Movies</h2>
        <div>
          <select ref={this.sort} onChange={() => { this.changeSorts() }}>
            <option value="original_title.asc">Alphabetical</option>
            <option value="release_date.asc">Release Date</option>
          </select>
          <select defaultValue="" ref={this.genre} onChange={() => { this.changeSorts() }}>
            <option value="">All Genres</option>
            {genres}
          </select>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Original Title</th>
              <th scope="col">Release Date</th>
              <th scope="col">Genre(s)</th>
            </tr>
          </thead>
          <tbody>{movies}</tbody>
        </table>

        <nav aria-label="Page Navigation" className="float-right">
          <span>Page {this.state.currentPage} of {this.state.moviePage.total_pages}</span>
          <ul className="pagination">
            <li className={this.state.currentPage <= 1 ? "page-item disabled" : "page-item"}>
              <a className="page-link" onClick={() => { this.lastPage(this.state.currentSort) }}>Previous</a>
            </li>

            <li className={this.state.currentPage >= this.state.moviePage.total_pages ? "page-item disabled" : "page-item"}>
              <a className="page-link" onClick={() => { this.nextPage(this.state.currentSort) }} >Next</a>
            </li>
          </ul>
        </nav>

      </div>
    )
  }
}