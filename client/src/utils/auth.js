import decode from "jwt-decode";
// create a new class to instantiate for a user
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  // checking if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // get token from local storage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // save token to local storage
      localStorage.setItem("id_token", idToken);
    setTimeout(() => {
      window.location.assign("/");
    }, 2000);
  }

  logout() {
    // clear token and profile
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();


//  testing