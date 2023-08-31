const TOKENS = "tokens";
const USER_INFO = "userInfo";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

class LStorage {
  getTokens() {
    const tokens = window.localStorage.getItem(TOKENS);
    return tokens ? JSON.parse(tokens) : null;
  }

  saveTokens(tokens: Tokens) {
    window.localStorage.setItem(TOKENS, JSON.stringify(tokens));
  }

  destroyTokens() {
    window.localStorage.removeItem(TOKENS);
  }
  clearStorage() {
    window.localStorage.clear();
  }
}

export default new LStorage();