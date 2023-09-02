const ACCESS_TOKEN = 'accessToken';
const USER_INFO = "userInfo";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type UserInfo = {
  id: string;
  name: string;
  isAuthor: boolean;
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

  saveUserInfo(user: UserInfo) {
    const json = JSON.stringify(user);
    window.localStorage.setItem(USER_INFO, json);
  }

  getUserInfo() {
    const json = window.localStorage.getItem(USER_INFO);
    return json ? JSON.parse(json) : {id: null, name: null, isAuthor: false};
  }
  
  clearStorage() {
    window.localStorage.clear();
  }
}

export default new LStorage();