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
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ContentIdContext } from "@/app/providers/content_id_provider";
import { useContext } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const pathname = usePathname();
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;

  const navItems = [
    { name: 'Home', path: '/dashboard', alwaysVisible: true },
    { name: 'Generate', path: '/generate', alwaysVisible: false },
    { name: 'Personas', path: '/personas', alwaysVisible: false },
    { name: 'Market Research', path: '/market-research', alwaysVisible: false },
    { name: 'Go To Market', path: '/gtm', alwaysVisible: false },
    { name: 'Executive Brief', path: '/executive-brief', alwaysVisible: false },
    { name: 'Campaigns', path: '/campaigns', alwaysVisible: false },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/50 backdrop-blur-sm shadow-sm">
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
                    <NavigationMenuLink
                      href={item.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === item.path ? "bg-background/50" : "bg-transparent",
                        "hover:bg-background/80 transition-colors duration-200"
                      )}
                      active={pathname === item.path}
                    >
                      {item.name}
                    </NavigationMenuLink>
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