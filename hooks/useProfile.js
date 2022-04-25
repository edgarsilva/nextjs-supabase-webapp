import { useQuery } from 'react-query';

// API calls
import { fetchProfile } from "../lib/api";

// Hooks
import useAuth from "./useAuth";

export default function useCollection({ placeholderData } = {}) {
  const { session } = useAuth();
  const {
    data: profile,
    isLoading,
    isFetching,
  } = useQuery(
    ["profile", session?.user?.id],
    () => fetchProfile({ id: session?.user?.id, colName: "user_id" }),
    {
      enabled: !!session?.user?.id,
      placeholderData
    }
  );

  return {
    profile,
    isLoading: isLoading,
    isFetching: isFetching,
  };
}