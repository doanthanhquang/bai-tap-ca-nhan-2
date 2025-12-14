import { cn } from "@/lib/utils";
interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer
      className={cn(
        "w-full bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 h-12 flex items-center justify-center text-md text-gray-600 dark:text-gray-400",
        className
      )}
    >
      18120525 - Đoàn Thanh Quang
    </footer>
  );
};

export default Footer;
