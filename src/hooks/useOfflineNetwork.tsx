import { useEffect, useState } from "react";

const useOfflineNetwork = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOfflineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener("offline", handleOfflineStatus);
    window.addEventListener("online", handleOfflineStatus);

    return () => {
      window.removeEventListener("offline", handleOfflineStatus);
      window.removeEventListener("online", handleOfflineStatus);
    };
  }, []);

  return isOffline;
};

export default useOfflineNetwork;
