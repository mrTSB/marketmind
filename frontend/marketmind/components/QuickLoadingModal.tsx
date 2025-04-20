import { useEffect, useState } from "react";
import { LoadingModal } from "./LoadingModal";

interface QuickLoadingModalProps {
  message?: string;
}

export function QuickLoadingModal({ message = "Loading..." }: QuickLoadingModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 0.2 seconds

    return () => clearTimeout(timer);
  }, []);

  return <LoadingModal isOpen={isOpen} message={message} />;
} 