import Link from "next/link";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

function Navbar() {
  const [username, setUsername] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("Form first useEffect", user);
        setUsername(user.username);
        setAuthenticated(true);
      })
      .catch((err) => {
        console.log(err);
        setUsername(null);
        setAuthenticated(false);
      });
  }, []);

  useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      Auth.currentAuthenticatedUser(payload);
      console.log(
        "Message from Navbar, new event has happened",
        data.payload.data.username + " has " + data.payload.event
      );
      setUsername(data.payload.data.username);
      setAuthenticated(true);
    });
  });

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      //userDispatch({ type: "USERLOGGEDOUT" });
      setUsername(null);
      setAuthenticated(false);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <nav
      className="navbar is-dark is-mobile"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand navbar-item has-text-primary has-text-weight-bold">
        <Link className="navbar-item" href="/">
          <a className="navbar-item">KaraTSS</a>
        </Link>
      </div>

      <div className="navbar menu is-dark is-active">
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">Home</a>
          </Link>

          <Link href="/profile">
            <a className="navbar-item">Profile</a>
          </Link>
          {/* <Link href="/protectedUser">
            <a className="navbar-item">Protected client route</a>
          </Link> */}
        </div>
      </div>
      <div className="navbar-end">
        {authenticated === false ? (
          <Link passHref={true} href="/login">
            <button className="button is-primary is-rounded">Ingresar</button>
          </Link>
        ) : (
          <div className="navbar-item">
            <span>Bienvenido {username}</span>
            <button
              onClick={() => signOut()}
              className="button is-rounded is-danger"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
