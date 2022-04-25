import { useMutation, useQueryClient } from 'react-query';

// API calls
import { updateProfile } from "../lib/api";

export default function useProfileMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateProfile, {
    onMutate: async (nextProfile) => {
      // A mutation is about to happen!
      // const profileId = newProfile.id;

      // Cancel current queries for the profiles list
      // await queryClient.cancelQueries(["profile", "new-profile"]);

      // Snapshot the previous value
      // const prevProfile = queryClient.getQueryData(["profile", "new-profile"]);

      // Optimistically update to the new value
      // queryClient.setQueryData(["profile", "new-profile"], (old = {}) => ({ ...old, ...newProfile }));

      // Return a context with the previous profile for rollbacks
      // return { prevProfile };
    },
    onError: (error, nextProfile, { prevProfile }) => {
      // An error happened!
      // console.log("Error:", error);
      // queryClient.setQueryData(["profile", ""], prevProfile);
    },
    onSuccess: (data, nextProfile, context) => {
      // Boom success baby set the data from the server!
      // console.log("data", data);
      queryClient.setQueryData(["profile", data.id], data);
    },
    onSettled: (data, error, nextProfile, context) => {
      // Always refetch after error or success:
      queryClient.invalidateQueries(["profile", nextProfile.id])
      // queryClient.invalidateQueries("profiles");
    },
  });

  return mutation;
}