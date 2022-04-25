import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import axios from "axios";

// Auth client
import { auth } from "../lib/supabase";

// API calls
import { fetchProfile } from "../lib/api";

export default function useAuthForContext() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    data: profile,
    isLoading: profileIsLoading,
  } = useQuery(
    ["profile", session?.user?.id],
    () => fetchProfile({ id: session?.user?.id, colName: "user_id" }),
    {
      enabled: !!session?.user?.id
    }
  );

  useEffect(() => {
		setSession(auth.session());

		const { data: authListener } = auth.onAuthStateChange(
			async (_event, session) => {
				setSession(session);
			}
		);

		return () => {
			authListener?.unsubscribe();
		};
  }, []);

  useEffect(() => {
    axios.post("/api/set-supabase-cookie", {
      event: session ? "SIGNED_IN" : "SIGNED_OUT",
      session: session
    });
  }, [session]);

  function resetError() {
    setError("");
  }

  async function signInWithEmail(email, password, cb) {
    setIsLoading(true);

    const res = await auth.signIn({
      email: email,
      password: password,
    })
    const { error } = res;

    if (error) setError(error?.message || error?.[0] || error);

    setIsLoading(false);

    cb && cb(res);
    return res;
  }

  async function signUpWithEmail(email, password, cb) {
    setIsLoading(true);

    const res = await auth.signUp({
      email: email,
      password: password,
    })
    const { error } = res;

    if (error) setError(error?.message || error?.[0] || error);

    setIsLoading(false)

    cb && cb(res);
    return res;
  }

  return {
    session,
    user: session?.user,
    profile,
    isLoading: isLoading || profileIsLoading,
    error,
    setError,
    resetError,
    signInWithIdToken: () => {},
    signInWithEmail,
    signUpWithEmail,
    signOut: () => {
      return auth.signOut();
    },
  }
}