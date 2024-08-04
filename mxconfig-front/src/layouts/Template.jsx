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
    link: "/components/cooler",
    icon: Bars4Icon,
  },
  {
    title: "Оперативная память",
    link: "/components/ram",
    icon: SunIcon,
  },
  {
    title: "Видеокарта",
    link: "/components/videocard",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Жесткий диск",
    link: "/components/hdd",
    icon: PhoneIcon,
  },
  {
    title: "SSD",
    link: "/components/ssd",
    icon: NewspaperIcon,
  },
  {
    title: "Блок питания",
    link: "/components/powersupply",
    icon: RectangleGroupIcon,
  },
  {
    title: "Корпус",
    link: "/components/case",
    icon: TagIcon,
  },
];

const mainNav = [
  // {
  //   label: "Главная",
  //   link: "/",
  // },
  {
    label: "Конфигуратор",
    link: "/configurator",
  },
  {
    label: "Комплектующие",
    megaMenu: componentsMenuItems
  },
  // {
  //   label: "Помощь",
  //   link: "/help",
  // },
  // {
  //   label: "О нас",
  //   link: "/about",
  // }
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