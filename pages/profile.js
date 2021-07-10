import { useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("User: ", user);
        setUser(user);
      })
      .catch((err) => {
        setUser(null);
      });
  }, []);
  return <div>{user && <h1> Welcome, {user.username}</h1>}</div>;
}

export default withAuthenticator(Profile);
