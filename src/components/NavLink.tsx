import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  const className = isActive
    ? "block py-2 pl-3 pr-4 text-cyan-700 rounded md:bg-transparent md:p-0"
    : "block py-2 pl-3 pr-4 hover:text-cyan-700 rounded md:bg-transparent md:p-0";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default NavLink;
