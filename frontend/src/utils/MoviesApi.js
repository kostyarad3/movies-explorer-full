class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Где-то ошибочка:( : ${response.status}`);
  }


  getMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => this._getResponseData(response));
  }

}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  // baseUrl: "http://localhost:3000",
});

export default moviesApi;
