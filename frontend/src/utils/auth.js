// !!!!!!!!
// export const BASE_URL = "https://api.mesto.kostyarad.nomoreparties.sbs";
export const BASE_URL = "http://localhost:3000";

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Где-то ошибочка:( : ${res.status}`);
}

export function register(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => getResponseData(res));
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => getResponseData(res))
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        return data.jwt;
      }
    });
};

export function getContent(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      //"Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then((res) => getResponseData(res))
    .then((data) => data);
}
