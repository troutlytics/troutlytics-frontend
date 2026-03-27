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
    ? "hud-pill hud-pill-active w-full md:w-auto"
    : "hud-pill w-full md:w-auto";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default NavLink;
