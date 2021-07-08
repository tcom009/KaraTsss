import { useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { UserContext } from "./_app.js";
function Profile() {
  const userContext = useContext(UserContext);
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
