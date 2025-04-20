'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ContentIdContext } from "@/app/providers/content_id_provider";
import { useContext } from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;

  const navItems = [
    // { name: 'Home', path: '/' },
    { name: 'Generate', path: '/generate', alwaysVisible: true },
    { name: 'Personas', path: '/personas', alwaysVisible: false },
    { name: 'Market Research', path: '/market-research', alwaysVisible: false },
    { name: 'Go To Market', path: '/gtm', alwaysVisible: false },
    { name: 'Executive Brief', path: '/executive-brief', alwaysVisible: false },
    { name: 'Campaigns', path: '/campaigns', alwaysVisible: false },
  ];

  // console.log('Navigation: Rendering with contentId:', contentId);
  // console.log('Navigation: Visible items:', navItems.filter(item => item.alwaysVisible || contentId !== null).map(item => item.name));

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
                    <Link href={item.path} passHref legacyBehavior>
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
            <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navigation; 