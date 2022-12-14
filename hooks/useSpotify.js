import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      // If the refresh access token attempt fails, then we direct the user to the login page...
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
    }
  }, [session]);
  spotifyApi.setAccessToken(session.user.accessToken);
  return spotifyApi;
}

export default useSpotify;
