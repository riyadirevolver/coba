const Menuitems = [
  {
    title: "Management",
    icon: "report",
    href: "/client",
    collapse: true,
    isCLient: true,
    children: [
      {
        title: "Klien",
        icon: "all-report",
        href: "/client/client",
        isCLient: true,
      },
      {
        title: "User JC",
        icon: "absent",
        href: "/client/user-jc",
        isCLient: true,
      },
      {
        title: "Kandidat",
        icon: "users",
        href: "/client/candidate-sent",
        isCLient: true,
      },
    ],
  },
  {
    title: "Dashboard",
    icon: "dashboard",
    href: "/dashboards/dashboard",
    collapse: true,
    isAdmin: true,
    isSPV: true,
    isStaff: false,
  },
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
      {
        title: "Kandidat History",
        icon: "book",
        href: "/management/candidate-sent-history",
        isAdmin: true,
      },
      {
        title: "Report",
        icon: "book",
        href: "/management/report",
        isAdmin: true,
      },
    ],
  },
];
export default Menuitems;
