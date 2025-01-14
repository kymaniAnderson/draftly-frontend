import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      screen_hint: "login",
    },
    returnTo: "/auth/verify",
  }),
});
export const POST = handleAuth();
