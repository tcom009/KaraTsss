import { Auth, I18n, Hub } from "aws-amplify";
import { AmplifySignIn } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

I18n.setLanguage("es");
const dict = {
  es: {
    "Sign In": "Ingresar",
  },
};
I18n.putVocabularies(dict);

function Index() {
  const router = useRouter();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
      })
      // if there is no authenticated user, redirect to profile page
      .catch(() => router.push("/"));
    //router.push("/customers");
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className="column has-text-centered">
          <AmplifySignIn
            headerText="Bienvenido, ingresa tus credenciales"
            hideSignUp
          />
        </div>
      </div>
    </div>
  );
}

export default Index;
