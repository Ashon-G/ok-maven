import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface MobileFullscreenDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const MobileFullscreenDialog = ({
  open,
  onClose,
  children,
}: MobileFullscreenDialogProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!isMobile) return <>{children}</>;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 bg-background"
        >
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};