//import { Auth, I18n, Hub } from "aws-amplify";
//import { AmplifySignIn } from "@aws-amplify/ui-react";
//import { useEffect } from "react";
//import { useRouter } from "next/router";
import LoginForm from "./components/loginForm";

function Index() {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-one-third"></div>
        <div className="column is-one-third has-text-centered">
          <LoginForm />
        </div>
        <div className="column is-one-third"></div>
      </div>
    </div>
  );
}

export default Index;
