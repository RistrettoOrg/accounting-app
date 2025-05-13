import { useUserSession } from "@/shared/hooks/use-session";
import { useEffect, useState } from "react";
import { Router, useLocation, useNavigate, useParams } from "react-router";

const LoginRedirect = () => {
  const [text, setText] = useState("Loading...");
  const { setJwt, setUser } = useUserSession.getState();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(
      `http://localhost:1337/api/auth/${params.providerName}/callback${location.search}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        const { jwt, user } = res;
        console.log(res);
        setJwt(jwt);
        setUser(user);

        setText(
          "You have been successfully logged in. You will be redirected in a few seconds..."
        );
        navigate("/home"); // Redirect to homepage
        // setTimeout(() => history.push("/"), 3000); // Redirect to homepage after 3 sec
      })
      .catch((err) => {
        console.log(err);
        setText("An error occurred, please see the developer console.");
      });
  }, [location.search, params.providerName]);

  return <p>{text}</p>;
};

export default LoginRedirect;
