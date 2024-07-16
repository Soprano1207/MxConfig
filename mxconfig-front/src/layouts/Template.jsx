import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const componentsMenuItems = [
  {
    title: "Процессор",
    link: "/components/processor",
    icon: SquaresPlusIcon,
  },
  {
    title: "Материнская плата",
    link: "/components/motherboard",
    icon: UserGroupIcon,
  },
  {
    title: "Кулер",
    link: "/components",
    icon: Bars4Icon,
  },
  {
    title: "Оперативная память",
    link: "/components",
    icon: SunIcon,
  },
  {
    title: "Видеокарта",
    link: "/components",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Жесткий диск",
    link: "/components",
    icon: PhoneIcon,
  },
  {
    title: "SSD",
    link: "/components",
    icon: NewspaperIcon,
  },
  {
    title: "Блок питания",
    link: "/components",
    icon: RectangleGroupIcon,
  },
  {
    title: "Корпус",
    link: "/components",
    icon: TagIcon,
  },
];

const mainNav = [
  {
    label: "Главная",
    link: "/",
  },
  {
    label: "Конфигуратор",
    link: "/configurator",
  },
  {
    label: "Комплектующие",
    megaMenu: componentsMenuItems
  },
  {
    label: "Помощь",
    link: "/help",
  },
  {
    label: "О нас",
    link: "/about",
  }
];

export default function Template({ children }) {
  return (<>
    <Header mainNav={mainNav} />
    <main className=" bg-main-pattern">
      {React.Children.map(children, child => React.cloneElement(child, {}))}
    </main>
    <Footer mainNav={mainNav} />
  </>);
}