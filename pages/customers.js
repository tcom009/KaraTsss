import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import Table from "./components/table";
function Customers() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const tableParams = ["Nombre", "Apellido", "Email", "edad"];
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      // if there is no authenticated user, redirect to profile page
      .catch(() => router.push("/"));
  }, []);

  if (!user) return null;

  return <Table />;
}

export default Customers;
