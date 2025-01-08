'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../atoms/Accordion';
import { INavItem } from '../interfaces/navbar.interface';
import SidebarItem from './SideBarItem';

interface DashboardNavProps {
  items: INavItem[];
  isMobileNav?: boolean;
  onCloseSidebar?: () => void;
}

export default function DashboardNav({
  items,
  isMobileNav = false,
  onCloseSidebar,
}: DashboardNavProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <nav className='grid items-start gap-2'>
      {items.map((item, index) => {
        if (item.subItems && item.subItems.length > 0) {
          return (
            <Accordion type='single' collapsible key={index}>
              <AccordionItem value={item.title} className='border-b-0 '>
                <AccordionTrigger className='hover:bg-accent hover:text-accent-foreground py-0 hover:no-underline'>
                  <SidebarItem
                    key={item.label}
                    item={item}
                    isMobileNav={isMobileNav}
                    onCloseSidebar={onCloseSidebar}
                  />
                </AccordionTrigger>
                <AccordionContent className='pl-4 pb-0'>
                  {item.subItems
                    .map((subItem, index) => (
                      <SidebarItem
                        key={index}
                        item={subItem}
                        isMobileNav={isMobileNav}
                        onCloseSidebar={onCloseSidebar}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        }
        return (
          <SidebarItem
            key={index}
            item={item}
            isMobileNav={isMobileNav}
            onCloseSidebar={onCloseSidebar}
          />
        );
      })}
    </nav>
  );
}
