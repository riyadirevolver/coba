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
        title: "Kandidat JC",
        icon: "absent",
        href: "/client/user-jc",
        isCLient: true,
      },
      {
        title: "Submit Kandidat",
        icon: "users",
        href: "/client/candidate-sent",
        isCLient: true,
      },
      {
        title: "Submit History",
        icon: "books",
        href: "/client/candidate-sent-history",
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
        title: "Klien",
        icon: "users",
        href: "/management/client",
        isAdmin: true,
      },
      {
        title: "Kandidat JC",
        icon: "users",
        href: "/management/user-jc",
        isAdmin: true,
      },
      {
        title: "Submit Kandidat",
        icon: "users",
        href: "/management/candidate-sent",
        isAdmin: true,
      },
      {
        title: "Submit History",
        icon: "book",
        href: "/management/candidate-sent-history",
        isAdmin: true,
      },
    ],
  },
];
export default Menuitems;
