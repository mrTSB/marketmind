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
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <div className="flex flex-row items-center">
                <Image className="ml-8 mr-2 w-8 h-8" src="/logo.svg" alt="MarketMind" width={295} height={326} />
                <span className="text-2xl font-bold mr-8 tracking-tight">MarketMind</span>
            </div>
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