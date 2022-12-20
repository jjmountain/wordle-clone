import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useRef } from "react";
import Snowfall from "react-snowfall";

export default function Background({ children }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["photoData"],
    queryFn: async () => {
      const result = await fetch(
        "https://api.pexels.com/v1/search?query=Great%20Britain&per_page=30",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: import.meta.env.VITE_PEXELS_API_KEY,
          },
          mode: "no-cors",
        }
      );
      return result.json();
    },
    staleTime: Infinity,
    retryDelay: 60000,
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading
      </div>
    );

  if (error)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        An error has occurred.
      </div>
    );

  function chooseBackground() {
    let chosenPhoto =
      data.photos[Math.floor(Math.random() * data.photos.length)];
    return chosenPhoto["src"]["large2x"];
  }

  return (
    <div
      className="bg-[#012169] bg-cover"
      // style={{
      //   background: `url(${flagSVG}), no-repeat fixed center`,
      // }}
    >
      <div
        className="bg-contain bg-no-repeat bg-top bg-black"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${chooseBackground()}) no-repeat fixed center`,
        }}
      >
        {/* <Snowfall snowflakeCount={50} /> */}

        {children}
      </div>
    </div>
  );
}
