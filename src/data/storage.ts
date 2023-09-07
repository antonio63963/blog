const ACCESS_TOKEN = 'accessToken';
const USER_INFO = "userInfo";

type UserInfo = {
  id: string;
  name: string;
  isAuthor: boolean;
};

class LStorage {
   static getToken() {
    return window.localStorage.getItem(ACCESS_TOKEN);
  }

  static saveToken(token: string) {
    window.localStorage.setItem(ACCESS_TOKEN, token);
  }

  static destroyToken() {
    window.localStorage.removeItem(ACCESS_TOKEN);
  }

  static saveUserInfo(user: UserInfo) {
    const json = JSON.stringify(user);
    window.localStorage.setItem(USER_INFO, json);
  }

  static getUserInfo() {
    const json = window.localStorage.getItem(USER_INFO);
    return json ? JSON.parse(json) : {id: null, name: null, isAuthor: false};
  }
  
  static clearStorage() {
    window.localStorage.clear();
  }
}

export default LStorage;
