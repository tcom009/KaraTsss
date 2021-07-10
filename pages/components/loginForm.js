import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { useRouter } from "next/router";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    return function cleanup() {
      Hub.remove("auth");
    };
  });
  const signIn = async () => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const user = await Auth.signIn({ username, password });
      console.log(user);
      setIsLoading(false);
      router.push("/");
      console.log("Success!");
    } catch (error) {
      setIsLoading(false);
      console.log("error signing in", error);
      window.alert(error.message);
    }
  };

  return (
    <form className="box">
      <div className="field">
        <label className="label">Usuario</label>
        <div className="control">
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Contraseña</label>
        <div className="control">
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
          />
        </div>
      </div>
      {isLoading == true ? (
        <button className="button is-primary is-loading is-large" />
      ) : (
        <button className="button is-primary is-large" onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </form>
  );
}

export default LoginForm;
