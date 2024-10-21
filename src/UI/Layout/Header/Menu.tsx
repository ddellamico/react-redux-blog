import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/UI/Elements/Navigation';
import { Link } from 'react-router-dom';

type Props = {
  menuItems: { label: string; href: string; testId: string }[];
};

function Menu({ menuItems }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink asChild>
              <Link
                to={item.href}
                data-testid={item.testId}
                className={navigationMenuTriggerStyle()}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Menu;
