import Link from "next/link";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import router, { useRouter } from "next/router";

function Navbar() {
  const [username, setUsername] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const route = useRouter();

  useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      Auth.currentAuthenticatedUser(payload);
      if (data.payload.event === "signOut" || "signIn_failure") {
        setAuthenticated(false);
        router.push("/");
      }
      if (data.payload.event === "signIn") {
        setUsername(data.payload.data.username);
        setAuthenticated(true);
      }
    });
    return function cleanup() {
      Hub.remove("auth");
    };
  }, []);

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      setUsername(null);
      setAuthenticated(false);
      route.push("/");
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
            <a className="navbar-item">Inicio</a>
          </Link>

          <Link href="/customers">
            <a className="navbar-item">Clientes</a>
          </Link>
          <Link href="/sales">
            <a className="navbar-item">Ventas</a>
          </Link>
          <Link href="/artists">
            <a className="navbar-item">Artistas</a>
          </Link>
          <Link href="/services">
            <a className="navbar-item">Servicios</a>
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        {authenticated === false ? (
          <Link passHref={true} href="/">
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
