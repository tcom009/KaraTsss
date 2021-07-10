import { useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const signIn = async () => {
    setIsLoading(true);
    try {
      const user = await Auth.signIn(username, password);
      router.push("/welcome");
      console.log(user);
    } catch (error) {
      console.log("error signing in", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <form className="box">
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
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
        <button className="button is-primary is-loading is large" />
      ) : (
        <button className="button is-primary" onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </form>
  );
}

export default LoginForm;
