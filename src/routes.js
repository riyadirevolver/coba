// import
// To be changed
// import Tables from "views/Dashboard/Tables.js";
import { DocumentIcon, StatsIcon } from 'components/Icons/Icons';
import Kanban from 'views/Applications/Kanban.js';
import Projects from 'views/Pages/Profile/Projects.js';
import ProjectCardDetail from 'views/Pages/Projects/ProjectCardDetail';
import UserProjects from 'views/Pages/Projects/UserProjects';
import ProjectSetting from 'views/Pages/Projects/ProjectSetting';

const dashRoutes = [
  {
    name: 'Project Detail',
    component: Kanban,
    hide: true,
    authIcon: <DocumentIcon color="inherit" />,
    path: '/projects/:id',
    layout: '/admin',
  },
  {
    name: 'Project Settings',
    path: '/applications/project/settings/:id',
    hide: true,
    component: ProjectSetting,
    layout: '/admin',
  },
  {
    name: 'Project Settings',
    path: '/applications/user-projects/:project_id',
    hide: true,
    component: UserProjects,
    layout: '/admin',
  },
  {
    name: 'Card View',
    path: '/applications/project/card-details/:id',
    hide: true,
    component: ProjectCardDetail,
    layout: '/admin',
  },

  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   icon: <HomeIcon color="inherit" />,
  //   authIcon: <HomeIcon color="inherit" />,
  //   collapse: true,
  //   items: [
  //     {
  //       name: "Landing Page",
  //       path: "/dashboard/landing",
  //       component: Landing,
  //       layout: "/landing",
  //     },
  //     {
  //       name: "Default",
  //       path: "/dashboard/default",
  //       component: Default,
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Automotive",
  //       path: "/dashboard/automotive",
  //       component: Automotive,
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Smart Home",
  //       path: "/dashboard/smart-home",
  //       component: SmartHome,
  //       layout: "/admin",
  //     },
  //     {
  //       name: "CRM",
  //       path: "/dashboard/crm",
  //       component: CRM,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  {
    name: 'XPIPE',
    category: 'pages',
    items: [
      // {
      //   name: "Pages",
      //   path: "/pages",
      //   collapse: true,
      //   icon: <DocumentIcon color="inherit" />,
      //   items: [
      //     {
      //       name: "Profile",
      //       path: "/profile",
      //       collapse: true,
      //       authIcon: <HomeIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Profile Overview",
      //           secondaryNavbar: true,
      //           path: "/pages/profile/overview",
      //           component: Overview,
      //           layout: "/admin",
      //         },
      //         {
      //           name: "Teams",
      //           secondaryNavbar: true,
      //           path: "/pages/profile/teams",
      //           component: Teams,
      //           layout: "/admin",
      //         },
      //         {
      //           name: "All Projects",
      //           secondaryNavbar: true,
      //           path: "/pages/profile/profile-projects",
      //           component: Projects,
      //           layout: "/admin",
      //         },
      //       ],
      //     },
      //     {
      //       name: "Users",
      //       path: "/users",
      //       collapse: true,
      //       authIcon: <PersonIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Reports",
      //           path: "/pages/users/reports",
      //           component: Reports,
      //           layout: "/admin",
      //         },
      //         {
      //           name: "New User",
      //           path: "/pages/users/new-user",
      //           component: NewUser,
      //           layout: "/admin",
      //         },
      //       ],
      //     },
      //     {
      //       name: "Account",
      //       path: "/account",
      //       collapse: true,
      //       authIcon: <PersonIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Settings",
      //           path: "/pages/account/settings",
      //           component: Settings,
      //           layout: "/admin",
      //         },
      //         {
      //           name: "Billing",
      //           component: Billing,
      //           path: "/pages/account/billing",
      //           layout: "/admin",
      //         },
      //         {
      //           name: "Invoice",
      //           component: Invoice,
      //           path: "/pages/account/invoice",
      //           layout: "/admin",
      //         },
      //       ],
      //     },
      //     {
      //       name: "Projects",
      //       path: "/projects",
      //       collapse: true,
      //       authIcon: <StatsIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "General",
      //           path: "/pages/projects/general",
      //           component: General,
      //           layout: "/admin",
      //         },
      //         {
      //           name: "Timeline",
      //           path: "/pages/projects/timeline",
      //           component: Timeline,
      //           layout: "/admin",
      //         },
      //       ],
      //     },
      //     {
      //       name: "Pricing Page",
      //       component: Pricing,
      //       path: "/pages/pricing-page",
      //       layout: "/auth",
      //     },
      //     {
      //       name: "RTL",
      //       component: RTLPage,
      //       path: "/pages/rtl-support-page",
      //       layout: "/rtl",
      //     },
      //     {
      //       name: "Widgets",
      //       component: Widgets,
      //       path: "/pages/widgets",
      //       layout: "/admin",
      //     },
      //     {
      //       name: "Charts",
      //       component: Charts,
      //       path: "/pages/charts",
      //       layout: "/admin",
      //     },
      //     {
      //       name: "Alerts",
      //       path: "/pages/alerts",
      //       component: Alerts,
      //       layout: "/admin",
      //     },
      //   ],
      // },
      {
        name: 'Applications',
        path: '/applications',
        icon: <StatsIcon color="inherit" />,
        collapse: true,
        items: [
          // {
          //   name: "Kanban",
          //   component: Kanban,
          //   hide: true,
          //   authIcon: <DocumentIcon color="inherit" />,
          //   path: "/applications/kanban/:id",
          //   layout: "/admin",
          // },
          {
            name: 'Project',
            path: '/projects',
            component: Projects,
            layout: '/admin',
          },

          // {
          //   name: 'Wizard',
          //   component: Wizard,
          //   authIcon: <CartIcon color="inherit" />,
          //   path: '/applications/wizard',
          //   layout: '/admin',
          // },
          // {
          //   name: 'Data Tables',
          //   path: '/applications/data-tables',
          //   authIcon: <PersonIcon color="inherit" />,
          //   component: DataTables,
          //   layout: '/admin',
          // },
          // {
          //   name: "Calendar",
          //   component: Calendar,
          //   authIcon: <StatsIcon color="inherit" />,
          //   path: "/applications/calendar",
          //   layout: "/admin",
          // },
        ],
      },
      // {
      //   name: "Ecommerce",
      //   path: "/ecommerce",
      //   icon: <CartIcon color="inherit" />,
      //   collapse: true,

      //   items: [
      //     {
      //       name: "Products",
      //       path: "/products",
      //       collapse: true,
      //       authIcon: <DocumentIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "New Product",
      //           component: NewProduct,
      //           secondaryNavbar: true,
      //           path: "/ecommerce/products/new-product",
      //           layout: "/admin",
      //         },
      //         {
      //           name: "Edit Product",
      //           component: EditProduct,
      //           path: "/ecommerce/products/edit-product",
      //           layout: "/admin",
      //         },
      //         {
      //           name: "Product Page",
      //           component: ProductPage,
      //           path: "/ecommerce/products/product-page",
      //           layout: "/admin",
      //         },
      //       ],
      //     },
      //     {
      //       name: "Orders",
      //       path: "/orders",
      //       collapse: true,
      //       authIcon: <StatsIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Order List",
      //           component: OrderList,
      //           path: "/ecommerce/orders/order-list",
      //           layout: "/admin",
      //         },
      //         {
      //           name: "Order Details",
      //           component: OrderDetails,
      //           path: "/ecommerce/orders/order-details",
      //           layout: "/admin",
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name: "Authentication",
      //   path: "/authentication",
      //   icon: <PersonIcon color="inherit" />,
      //   collapse: true,
      //   items: [
      //     {
      //       name: "Sign In",
      //       path: "/authentication/sign-in",
      //       collapse: true,
      //       authIcon: <DocumentIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Basic",
      //           component: SignInBasic,
      //           path: "/authentication/sign-in/basic",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Cover",
      //           component: SignInCover,
      //           path: "/authentication/sign-in/cover",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Illustration",
      //           component: SignInIllustration,
      //           secondaryNavbar: true,
      //           path: "/authentication/sign-in/illustration",
      //           layout: "/auth",
      //         },
      //       ],
      //     },
      //     {
      //       name: "Sign Up",
      //       path: "/authentication/sign-up",
      //       collapse: true,
      //       authIcon: <DocumentIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Basic",
      //           component: SignUpBasic,
      //           path: "/authentication/sign-up/basic",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Cover",
      //           component: SignUpCover,
      //           path: "/authentication/sign-up/cover",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Illustration",
      //           secondaryNavbar: true,
      //           component: SignUpIllustration,
      //           path: "/authentication/sign-up/illustration",
      //           layout: "/auth",
      //         },
      //       ],
      //     },
      //     {
      //       name: "Reset password",
      //       path: "/authentication/reset",
      //       collapse: true,
      //       authIcon: <DocumentIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Basic",
      //           component: ResetBasic,
      //           path: "/authentication/reset/basic",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Cover",
      //           component: ResetCover,
      //           path: "/authentication/reset/cover",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Illustration",
      //           secondaryNavbar: true,
      //           component: ResetIllustration,
      //           path: "/authentication/reset/illustration",
      //           layout: "/auth",
      //         },
      //       ],
      //     },
      //     {
      //       name: "Lock",
      //       path: "/authentication/lock",
      //       collapse: true,
      //       authIcon: <DocumentIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Basic",
      //           component: LockBasic,
      //           path: "/authentication/lock/basic",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Cover",
      //           component: LockCover,
      //           path: "/authentication/lock/cover",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Illustration",
      //           secondaryNavbar: true,
      //           component: LockIllustration,
      //           path: "/authentication/lock/illustration",
      //           layout: "/auth",
      //         },
      //       ],
      //     },
      //     {
      //       name: "2-Step Verification",
      //       path: "/authentication/verification",
      //       collapse: true,
      //       authIcon: <DocumentIcon color="inherit" />,
      //       items: [
      //         {
      //           name: "Basic",
      //           component: VerificationBasic,
      //           path: "/authentication/verification/basic",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Cover",
      //           component: VerificationCover,
      //           path: "/authentication/verification/cover",
      //           layout: "/auth",
      //         },
      //         {
      //           name: "Illustration",
      //           secondaryNavbar: true,
      //           component: VerificationIllustration,
      //           path: "/authentication/verification/illustration",
      //           layout: "/auth",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];

export default dashRoutes;
