import Link from "next/link";
//import { withSSRContext } from "aws-amplify";
import { Auth } from "aws-amplify";
import { UserContext } from "../_app";
import { useContext } from "react";

function Navbar() {
  const userContext = useContext(UserContext);

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand navbar-item has-text-primary has-text-weight-bold">
        <Link className="navbar-item" href="">
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
          <Link href="/protected">
            <a className="navbar-item">Protected</a>
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        {userContext.userState.authenticated === false ? (
          <Link passHref={true} href="/profile">
            <button className="button is-primary is-rounded">Ingresar</button>
          </Link>
        ) : (
          <span>Bienvenido {userContext.userState.username}</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
