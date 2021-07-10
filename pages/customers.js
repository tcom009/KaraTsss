import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

function Customers() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      // if there is no authenticated user, redirect to profile page
      .catch(() => router.push("/"));
  }, []);
  if (!user) return null;
  return <h1>Clientes </h1>;
}

export default Customers;
