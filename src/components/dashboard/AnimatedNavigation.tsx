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
import { ListTodo, MessageSquare, Wallet, User, Settings } from "lucide-react";

const NUM_LINES = 30;

const AnimatedNavigation = () => {
  const { session } = useAuth();
  const isAdmin = session?.user?.user_metadata?.user_type === 'admin';
  const location = useLocation();
  const navigate = useNavigate();

  // Define nav items based on user role
  const navItems = [
    { position: 1, title: "Tasks", path: "/dashboard/tasks", icon: ListTodo },
    { position: 8, title: "Chat", path: "/dashboard/chat", icon: MessageSquare },
    { position: 15, title: "Treasury", path: "/dashboard/treasury", icon: Wallet },
    { position: 22, title: "Profile", path: "/dashboard/profile", icon: User },
    ...(isAdmin ? [{ position: 29, title: "Admin", path: "/dashboard/admin", icon: Settings }] : []),
  ];

  const [isHovered, setIsHovered] = useState(false);
  const mouseY = useMotionValue(Infinity);

  // Mobile Bottom Navigation
  const MobileNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === location.pathname;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-secondary' : 'text-gray-500'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );

  // Desktop Side Navigation
  return (
    <>
      <motion.nav
        className="hidden md:flex fixed right-0 top-0 h-screen flex-col items-end justify-between py-4 pl-8 z-50"
        onMouseMove={(e) => {
          mouseY.set(e.clientY);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          mouseY.set(Infinity);
          setIsHovered(false);
        }}
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
      <MobileNav />
    </>
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