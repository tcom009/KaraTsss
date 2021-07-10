import { Auth } from "aws-amplify";
import LoginForm from "./components/loginForm";

function Login() {
  return (
    <div className="container">
      <div className="columns">
        <div className="column has-text-centered">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;

/*import { useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

function Profile() {

  const { userDispatch } = userContext;
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("User: ", user);
        setUser(user);
        userDispatch({ value: user.username, type: "USERLOGGEDIN" });
      })
      .catch((err) => {
        setUser(null);
        userDispatch({ value: null, type: "USERLOGGEDOUT  " });
      });
  }, [userDispatch]);
  return (
    <div>{user && <h1> Welcome, {userContext.userState.username}</h1>}</div>
  );
}

export default withAuthenticator(Profile);
*/
