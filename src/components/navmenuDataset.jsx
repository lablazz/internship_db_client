import {
  faHouse,
  faMagnifyingGlass,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const adminNavMenu = [
  {
    id: 0,
    title: "Home",
    icon: faHouse,
    maincolor: "#8A79AF",
    subcolor: '#fff',
    pathname: '/dashboard'
  }
];

export const stdNavMenu = [
  {
    id: 0,
    title: "Home",
    icon: faHouse,
    maincolor: "#8A79AF",
    subcolor: '#fff',
    pathname: '/dashboard'
  },
  {
    id: 1,
    title: "search",
    icon: faMagnifyingGlass,
    maincolor: "#FFD2A5",
    subcolor: '#030303',
    pathname: '/co-search'
  }
];
export const teaNavMenu = [
  {
    id: 0,
    title: "Home",
    icon: faHouse,
    maincolor: "#8A79AF",
    subcolor: '#fff',
    pathname: '/dashboard'
  },
  {
    id: 1,
    title: "search",
    icon: faMagnifyingGlass,
    maincolor: "#FFD2A5",
    subcolor: '#030303',
    pathname: '/co-search'
  },
  {
    id: 2,
    title: "search",
    icon: faUsers,
    maincolor: "#D38CAD",
    subcolor: '#030303',
    pathname: '/std-search'
  }
];
