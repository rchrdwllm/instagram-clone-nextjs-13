import Link from 'next/link';
import { Button } from './ui/button';

type NavLinkProps = {
    href: string;
    label: string;
    Icon: any;
};

const NavLink = ({ href, label, Icon }: NavLinkProps) => {
    return (
        <Link href={href} className="block w-full">
            <Button className="flex justify-start space-x-4 w-full" variant="ghost">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
            </Button>
        </Link>
    );
};

export default NavLink;
