import { useState, useEffect, useCallback } from "react";
import { getToken, clearToken, getLoginUrl, fetchMe } from "../api";
import type { AuthUser } from "../api";

import { setUsername as apiSetUsername } from "../api";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [unlocks, setUnlocks] = useState<string[]>(["warga"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe().then((result) => {
      if (result) {
        setUser(result.user);
        setUnlocks(result.unlocked);
      }
      setLoading(false);
    });
  }, []);

  const login = useCallback(() => {
    window.location.href = getLoginUrl();
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setUnlocks(["warga"]);
  }, []);

  const updateUnlocks = useCallback((newUnlocks: string[]) => {
    setUnlocks(newUnlocks);
  }, []);

  const updateUsername = useCallback(async (username: string) => {
    const result = await apiSetUsername(username);
    if (result.ok && result.username && user) {
      setUser({ ...user, username: result.username });
    }
    return result;
  }, [user]);

  const displayName = user?.username ?? user?.name ?? "Warga";

  return { user, unlocks, loading, login, logout, updateUnlocks, updateUsername, displayName };
}
