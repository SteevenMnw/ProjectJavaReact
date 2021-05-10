import axios from "axios";

const BASE_URL = "http://localhost:8888/";

// Récupère tous les utilisateurs
// https://springmspr.herokuapp.com/users/all
export function getAllUsers() {
  const url = BASE_URL + "/users/all";
  return axios.get(url).then((response) => response.data);
}

// Récupère l'utilisateur grâce à l'id
// https://springmspr.herokuapp.com/users/1
export function getUserById(id) {
  const url = BASE_URL + "/users/" + id;
  return axios.get(url).then((response) => response.data);
}

// Récupère l'utilisateur grâce à son email et son password
// https://springmspr.herokuapp.com/users/identification
export function getUserByEmailAndPassword(email, password) {
  const url = BASE_URL + "users/identification";
  return axios
    .get(url, { params: { email: email, password: password } })
    .then((response) => response.data);
}

// Ajout d'un coupon à l'utilisateur en utilisant l'id du coupon, l'id de l'utilisateur
// https://springmspr.herokuapp.com/users/1/addCoupon
export function addCouponForUser(idUser, idCoupon) {
  const url = BASE_URL + `/users/${idUser}/addCoupon`;
  return axios
    .put(url, null, { params: { idCoupon } })
    .then((response) => response.status);
}

// Ajout d'un utilisateur
// https://springmspr.herokuapp.com/users/add
export function addUser(name, surname, identifier, password, email) {
  const url = BASE_URL + "users/add";
  return axios
    .post(url, null, { params: { name, surname, identifier, password, email } })
    .then((response) => response.data);
}

// Supprime le coupon d'un utilisateur
export function deleteCouponForUser(idUser, idCoupon) {
  const url = BASE_URL + `/users/${idUser}/deleteCoupon`;
  return axios
    .put(url, null, { params: { idCoupon } })
    .then((respone) => respone.status);
}

export function getAllImage() {
  const url = BASE_URL + "images/all";
  return axios
    .get(url)
    .then((response) => response.data);
}

export function getAllImageOnline() {
  const url = BASE_URL + "images/state/1";
  return axios
    .get(url)
    .then((response) => response.data);
}

export function getAllCategorie() {
  const url = BASE_URL + "categories/all";
  return axios
    .get(url)
    .then((response) => response.data);
}