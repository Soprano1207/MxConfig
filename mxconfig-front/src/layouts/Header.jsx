import React from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { BellIcon, UserCircleIcon, InboxArrowDownIcon, LifebuoyIcon } from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";

const profileMenuItems = [
  {
    label: "Профиль",
    link: "/profile",
    icon: UserCircleIcon,

  },
  {
    label: "Мои сборки",
    link: "/mybuilds",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Помощь",
    icon: LifebuoyIcon,
  },
  {
    label: "Выйти",
    icon: ArrowLeftEndOnRectangleIcon,
    onClick: (userStore) => {
      userStore.signOut();
      window.location.href = "/";
    }
  },
];

function ProfileMenu({UserStore}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            src={UserStore?.user?.img}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return link ? (
            <Link key={label} to={link}>
              <MenuItem
                key={label}
                onClick={closeMenu}
                className="flex items-center gap-2 rounded"
              >
                {React.createElement(icon, {
                  className: "h-4 w-4",
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-normal">
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          ) : (
              <MenuItem
                key={label}
                onClick={() => onClick(UserStore)}
                className="flex items-center gap-2 rounded"
              >
                {React.createElement(icon, {
                  className: "h-4 w-4",
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-normal">
                  {label}
                </Typography>
              </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}


function NavItem({ label, isActive, link = "" }) {
  return (
    <Link to={link}>
      <Typography
        as="li"
        variant="small"
        className={`p-1 font-medium text-gray-900`}
      >
        {label}
      </Typography>
    </Link>
  );
}

function NavItemMegaMenu({ label, isActive, megaMenu }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = megaMenu.map(
    ({ icon, title, link }) => (
      <Link to={link} key={title}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center !font-medium text-blue-gray-500"
            >
              {title}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ),
  );
  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="li" variant="small" className={`p-1 font-medium text-gray-900 `}>
            <ListItem
              className="flex items-center gap-2 p-0 "
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {label}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>

  );
}


export default function Header({ mainNav = [] }) {
  const UserStore = React.useContext(UserContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);

  return (
    <Navbar className="sticky top-0 z-10 h-max rounded-none px-4 py-2 lg:px-8 lg:py-4" fullWidth>
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex gap-2">
            <img src="/image/mt-logo.svg" alt="logo" />
            <Typography
              color="blue-gray"
              className="mr-4 text-xs font-bold cursor-pointer"
            >
              MXConfig
            </Typography>
          </div>
        </Link>

        <div className="lg:flex hidden items-center gap-2">
          <div className="hidden lg:block mr-4">
            <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-1 lg:flex-row lg:items-center lg:gap-8">
              {mainNav.map(({ label, link, megaMenu }) =>
                megaMenu?.length
                  ? <NavItemMegaMenu key={label} label={label} megaMenu={megaMenu} />
                  : <NavItem key={label} label={label} link={link} />
              )}
            </ul>
          </div>
          <IconButton variant="text">
            <BellIcon className="h-5 w-5 text-gray-400" />
          </IconButton>
          <ProfileMenu UserStore={UserStore}/>
        </div>
        <IconButton
          size="sm"
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-1 lg:flex-row lg:items-center lg:gap-8">
          {mainNav.map(({ label, link, megaMenu }) =>
            megaMenu?.length
              ? <NavItemMegaMenu key={label} label={label} megaMenu={megaMenu} />
              : <NavItem key={label} label={label} link={link} />
          )}
        </ul>
        <div className="flex items-center gap-2">
          <IconButton variant="text">
            <BellIcon className="h-5 w-5 text-gray-400" />
          </IconButton>
          <ProfileMenu />
        </div>
        <Button variant="text" className="mt-4">
          Выйти
        </Button>
      </Collapse>
    </Navbar>
  );
}