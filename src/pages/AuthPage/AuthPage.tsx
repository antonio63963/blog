import React, {FC} from "react";
import Database from "../../data/database";

const AuthPage: FC = () => {
  return <>
    <h1>Auth page</h1>
    <button onClick={() => Database.createUser('shotvideo25@gmail.com', '123123')}>CreateUser</button>
    <button onClick={() => Database.signin('shotvideo25@gmail.com', '123123')}>SIGNIN</button>
  </>
};

export default AuthPage;