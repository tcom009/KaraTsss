import { withSSRContext } from "aws-amplify";
import { useRouter } from "next/dist/client/router";
function Protected({ authenticated, username }) {
  if (!authenticated) {
    return <h1>Forbiden!, you must be authenticated to see this route </h1>;
  }
  return <h1>Hello {username} from a SSR route</h1>;
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    console.log("user: ", user);
    return {
      props: {
        authenticated: true,
        username: user.username,
      },
    };
  } catch (err) {
    return {
      props: {
        authenticated: false,
      },
    };
  }
}

export default Protected;
