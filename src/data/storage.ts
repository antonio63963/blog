const ACCESS_TOKEN = 'accessToken';
const USER_INFO = "userInfo";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

class LStorage {
   getToken() {
    return window.localStorage.getItem(ACCESS_TOKEN);
  }

  saveToken(token: string) {
    window.localStorage.setItem(ACCESS_TOKEN, token);
  }

  destroyToken() {
    window.localStorage.removeItem(ACCESS_TOKEN);
  }
  clearStorage() {
    window.localStorage.clear();
  }
}

export default new LStorage();