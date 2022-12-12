import { createClient } from "pexels";
import { useQuery } from "@tanstack/react-query";

export default function Background({ children }) {
  const client = createClient(
    "563492ad6f9170000100000148243ec4caf14dcfa3c100055f1f109e"
  );
  const query = "British";

  const { isLoading, error, data } = useQuery({
    queryKey: ["photoData"],
    queryFn: async () => {
      const result = await client.photos.search({ query, per_page: 30 });
      return result;
    },
    staleTime: Infinity,
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
      className="bg-contain bg-no-repeat bg-center bg-white"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${chooseBackground()}) no-repeat fixed center`,
      }}
    >
      {children}
    </div>
  );
}
