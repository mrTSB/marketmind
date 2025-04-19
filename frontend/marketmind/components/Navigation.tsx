'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Generate', path: '/generate' },
    { name: 'Personas', path: '/personas' },
    { name: 'Market Research', path: '/market-research' },
    { name: 'Go To Market', path: '/gtm' },
    { name: 'Settings', path: '/settings' },

  ];

  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex flex-row items-center">
                <Image className="mr-2 w-8 h-8" src="/logo.svg" alt="MarketMind" width={295} height={326} />
                <span className="text-2xl font-bold mr-8 tracking-tight">MarketMind</span>
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link href={item.path} passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === item.path}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default Navigation; 