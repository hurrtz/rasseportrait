import { useCallback } from "react";

type EventProperties = Record<string, any>;

export const useAmplitude = () => {
  const track = useCallback(
    async (eventName: string, properties?: EventProperties) => {
      // Only track on client side
      if (typeof window === "undefined") return;

      try {
        const { track } = await import("@amplitude/analytics-browser");
        track(eventName, {
          timestamp: Date.now(),
          url: window.location.href,
          ...properties,
        });
      } catch (error) {
        console.error("Failed to track event:", eventName, error);
      }
    },
    [],
  );

  const identify = useCallback(
    async (userId: string, userProperties?: EventProperties) => {
      if (typeof window === "undefined") return;

      try {
        const { setUserId, identify, Identify } = await import(
          "@amplitude/analytics-browser"
        );
        setUserId(userId);
        if (userProperties) {
          const identifyEvent = new Identify();
          Object.entries(userProperties).forEach(([key, value]) => {
            identifyEvent.set(key, value);
          });
          identify(identifyEvent);
        }
      } catch (error) {
        console.error("Failed to identify user:", error);
      }
    },
    [],
  );

  const setUserProperty = useCallback(async (property: string, value: any) => {
    if (typeof window === "undefined") return;

    try {
      const { identify, Identify } = await import(
        "@amplitude/analytics-browser"
      );
      const identifyEvent = new Identify();
      identifyEvent.set(property, value);
      identify(identifyEvent);
    } catch (error) {
      console.error("Failed to set user property:", error);
    }
  }, []);

  return {
    track,
    identify,
    setUserProperty,
  };
};
