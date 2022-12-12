import { createClient } from "pexels";
import { useQuery } from "@tanstack/react-query";

export default function Background({ children }) {
  const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);
  const query = "British";

  const { isLoading, error, data } = useQuery({
    queryKey: ["photoData"],
    queryFn: async () => {
      const result = await client.photos.search({ query, per_page: 30 });
      return result;
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
    <div className="bg-blue-900">
      <div
        className="bg-contain bg-no-repeat bg-top bg-black"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${chooseBackground()}) no-repeat fixed center`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
