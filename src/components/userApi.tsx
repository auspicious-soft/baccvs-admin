import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axios";

export default function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/user/profile");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return <div>{JSON.stringify(data)}</div>;
}
