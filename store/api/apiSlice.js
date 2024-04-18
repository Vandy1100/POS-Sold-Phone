import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  logout,
  setCredentials,
  setCurrentUser,
} from "../features/auth/authSlice";
import { getDecryptedRefreshToken } from '../../lib/cryptography';
import { useRouter } from "next/navigation";

// create base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    headers.set("content-type", "application/json");
    console.log("token",token)
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

// custom base query with re-authentication when token expires
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.data?.code == 401) {
    const refreshToken = await getDecryptedRefreshToken();
    console.log("refreshToken):",refreshToken)
    if (!refreshToken) {
      const router = useRouter();
      router.push("/auth/login");
    }
    else if(refreshToken) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          }
        );
        const resultResponse = await response.json();
        console.log("resultResponse",resultResponse)
        console.log("code",resultResponse?.code)
        if (resultResponse?.code === "200") {
          api.dispatch(setCredentials(resultResponse?.data));
          // router.push("/");
          try {
            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${resultResponse?.data?.accessToken}`,
              },
            });
          
            if (!userResponse.ok) {
              throw new Error(`Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}`);
            }
          
            const userResult = await userResponse.json();
            api.dispatch(setCurrentUser(userResult));
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
          
          
          result = await baseQuery(args, api, extraOptions);
        } else if (resultResponse?.status == 404) {
          api.dispatch(logout());
          router.push("/auth/login");
          alert("Your session has expired. Please login again.");
        }
      } catch (error) {
        console.error("Failed to refresh access token", error);
        router.push("/auth/login");
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
      router.push("/auth/login");
      alert("Your session has expired. Please login again.");
    }
  }
  return result;
};
// create api slice with custom base query
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"], // tagTypes are used for cache invalidation
  endpoints: (builder) => ({}),
});