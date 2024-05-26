import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useAnimation } from "framer-motion";

export const useRouteTransition = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const animate = useAnimation();
  const initial = {
    opacity: 0,
    y: -10,
  };
  const exit = {
    opacity: 0,
    y: -10,
  };

  useEffect(() => {
    animate.start({ opacity: 1, y: 0 });
  }, [pathname, params]);

  const handleRouteChange = async (route: string) => {
    await animate.start({ opacity: 0, y: -10 });
    router.push(route);
  };

  return { animateProps: { animate, initial, exit }, handleRouteChange };
};
