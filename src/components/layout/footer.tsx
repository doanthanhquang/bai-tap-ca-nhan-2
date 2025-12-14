import { cn } from "@/lib/utils";
interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 h-12 flex items-center justify-center text-md text-gray-600 dark:text-gray-400 absolute bottom-0",
        className
      )}
    >
      18120525 - Đoàn Thanh Quang
    </footer>
  );
}
