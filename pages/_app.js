//import { css } from "@emotion/css";
import "../styles/globals.css";
import Amplify from "aws-amplify";
import config from "../src/aws-exports";
import Navbar from "./components/navbar";
import { useReducer } from "react";
Amplify.configure({
  ...config,
  ssr: true,
});

//const store = createStore(rootReducer);
//const UserContext = createContext();

// const userInitialState = {
//   username: null,
//   authenticated: false,
// };

// function UserReducer(state, action) {
//   switch (action.type) {
//     case "USERLOGGEDIN":
//       return { ...state, username: action.value, authenticated: true };
//     case "USERLOGGEDOUT":
//       return { ...state, username: null, authenticated: false };
//     default:
//       return state;
//   }
// }

export default function MyApp({ Component, pageProps }) {
  //const [userState, userDispatch] = useReducer(UserReducer, userInitialState);
  return (
    // <UserContext.Provider
    //   value={{ userState: userState, userDispatch: userDispatch }}
    // >
    <div>
      {/* <Navbar />; */}
      <Component {...pageProps} />
    </div>
    //</UserContext.Provider>
  );
}
