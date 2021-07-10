//import { Auth, I18n, Hub } from "aws-amplify";
//import { AmplifySignIn } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
//import { useRouter } from "next/router";
import { Auth, Hub } from "aws-amplify";
import LoginForm from "./components/loginForm";
import Welcome from "./components/welcome";
import { useRouter } from "next/router";

function Index() {
  const [username, setUsername] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      Auth.currentAuthenticatedUser(payload);

      console.log(data.payload);
      if (data.payload.event === "signOut" || "signIn_failure") {
        router.push("/");
        setAuthenticated(false);
      }
      if (data.payload.event === "signIn") {
        setUsername(data.payload.data.username);
        setAuthenticated(true);
      }
    });
    return function cleanup() {
      Hub.remove("auth");
    };
  });

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-one-third"></div>
        <div className="column is-one-third ">
          {authenticated === true ? (
            <Welcome username={username} />
          ) : (
            <LoginForm />
          )}
        </div>
        <div className="column is-one-third"></div>
      </div>
    </div>
  );
}

export default Index;
