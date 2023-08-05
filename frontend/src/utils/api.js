class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
    this._credentials = config.credentials;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Где-то ошибочка:( : ${response.status}`);
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: this._credentials,
    }).then((response) => this._getResponseData(response));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: this._credentials,
    }).then((response) => this._getResponseData(response));
  }

  editUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((response) => this._getResponseData(response));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: this._credentials,
    }).then((response) => this._getResponseData(response));
  }

}

const api = new Api({
  // baseUrl: "https://api.mesto.kostyarad.nomoreparties.sbs",
  credentials: "include",
  baseUrl: "http://localhost:3000",
});

export default api;
