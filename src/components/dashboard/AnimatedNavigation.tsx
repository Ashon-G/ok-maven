import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const NUM_LINES = 30;

const AnimatedNavigation = () => {
  const { session } = useAuth();
  const isAdmin = session?.user?.user_metadata?.user_type === 'admin';
  const location = useLocation();
  const navigate = useNavigate();

  // Define nav items based on user role
  const navItems = [
    { position: 1, title: "Tasks", path: "/dashboard/tasks" },
    { position: 8, title: "Chat", path: "/dashboard/chat" },
    { position: 15, title: "Treasury", path: "/dashboard/treasury" },
    { position: 22, title: "Profile", path: "/dashboard/profile" },
    ...(isAdmin ? [{ position: 29, title: "Admin", path: "/dashboard/admin" }] : []),
  ];

  const [isHovered, setIsHovered] = useState(false);
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.nav
      onMouseMove={(e) => {
        mouseY.set(e.clientY);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        mouseY.set(Infinity);
        setIsHovered(false);
      }}
      className="fixed right-0 top-0 flex h-screen flex-col items-end justify-between py-4 pl-8 z-50"
    >
      {Array.from(Array(NUM_LINES).keys()).map((i) => {
        const linkContent = navItems.find((item) => item.position === i + 1);

        return (
          <LinkLine
            key={i}
            title={linkContent?.title}
            path={linkContent?.path}
            isActive={linkContent?.path === location.pathname}
            isHovered={isHovered}
            mouseY={mouseY}
            onClick={() => linkContent?.path && navigate(linkContent.path)}
          />
        );
      })}
    </motion.nav>
  );
};

const SPRING_OPTIONS = {
  mass: 1,
  stiffness: 200,
  damping: 15,
};

const LinkLine = ({
  mouseY,
  isHovered,
  title,
  path,
  isActive,
  onClick,
}: {
  mouseY: MotionValue;
  title?: string;
  path?: string;
  isActive?: boolean;
  isHovered: boolean;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    return val - (bounds?.y || 0) - (bounds?.height || 0) / 2;
  });

  const lineWidthRaw = useTransform(distance, [-80, 0, 80], [15, 100, 15]);
  const lineWidth = useSpring(lineWidthRaw, SPRING_OPTIONS);
  const linkWidth = useSpring(25, SPRING_OPTIONS);

  useEffect(() => {
    if (isHovered) {
      linkWidth.set(150);
    } else {
      linkWidth.set(25);
    }
  }, [isHovered, linkWidth]);

  if (title && path) {
    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        className={`group relative cursor-pointer transition-colors ${
          isActive ? 'bg-secondary' : 'bg-neutral-500 hover:bg-secondary'
        }`}
        style={{ width: linkWidth, height: 2 }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase transition-colors ${
                isActive ? 'text-secondary' : 'text-neutral-500 group-hover:text-secondary'
              }`}
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="relative bg-neutral-500"
      style={{ width: lineWidth, height: 2 }}
    />
  );
};

export default AnimatedNavigation;