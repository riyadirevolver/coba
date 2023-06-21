const Menuitems = [
  {
    title: "Management",
    icon: "management",
    href: "/management",
    collapse: true,
    isAdmin: true,
    isStaff: true,
    children: [
      {
        title: "User",
        icon: "users",
        href: "/management/user",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
      {
        title: "Client",
        icon: "users",
        href: "/management/client",
        isAdmin: true,
      },
      {
        title: "User JC",
        icon: "users",
        href: "/management/user-jc",
        isAdmin: true,
      },
      {
        title: "Kandidat",
        icon: "users",
        href: "/management/candidate-sent",
        isAdmin: true,
      },
    ],
  },
];
export default Menuitems;
