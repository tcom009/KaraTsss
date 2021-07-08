import Link from "next/link";
//import { withSSRContext } from "aws-amplify";
import { Auth } from "aws-amplify";
import { UserContext } from "../_app";
import { useContext } from "react";
function Navbar() {
  const userContext = useContext(UserContext);
  const { userState, userDispatch } = userContext;
  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      userDispatch({ type: "USERLOGGEDOUT" });
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
        {userContext.userState.authenticated === false ? (
          <Link passHref={true} href="/profile">
            <button className="button is-primary is-rounded">Ingresar</button>
          </Link>
        ) : (
          <div className="navbar-item">
            <span>Bienvenido {userState.username}</span>
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
