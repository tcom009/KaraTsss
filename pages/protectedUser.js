import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

function ProtectedUser() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => router.push("/profile"));
  }, []);
  if (!user) return null;
  return <h1>Hola {user.username} from a client side rendered route</h1>;
}

export default ProtectedUser;
