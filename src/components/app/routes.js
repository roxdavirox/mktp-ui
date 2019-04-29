// import Buttons from "views/Components/Buttons.jsx";
// import Calendar from "views/Calendar/Calendar.jsx";
// import Charts from "views/Charts/Charts.jsx";
// import Dashboard from "views/Dashboard/Dashboard.jsx";
// import ErrorPage from "views/Pages/ErrorPage.jsx";
// import ExtendedForms from "views/Forms/ExtendedForms.jsx";
// import ExtendedTables from "views/Tables/ExtendedTables.jsx";
// import FullScreenMap from "views/Maps/FullScreenMap.jsx";
// import GoogleMaps from "views/Maps/GoogleMaps.jsx";
// import GridSystem from "views/Components/GridSystem.jsx";
// import Icons from "views/Components/Icons.jsx";
// import LockScreenPage from "views/Pages/LockScreenPage.jsx";
// import LoginPage from "views/Pages/LoginPage.jsx";
// import Notifications from "views/Components/Notifications.jsx";
// import Panels from "views/Components/Panels.jsx";
// import PricingPage from "views/Pages/PricingPage.jsx";
// import ReactTables from "views/Tables/ReactTables.jsx";
// import RegisterPage from "views/Pages/RegisterPage.jsx";
// import RegularForms from "views/Forms/RegularForms.jsx";
// import RegularTables from "views/Tables/RegularTables.jsx";
// import SweetAlert from "views/Components/SweetAlert.jsx";
// import TimelinePage from "views/Pages/Timeline.jsx";
// import Typography from "views/Components/Typography.jsx";
// import UserProfile from "views/Pages/UserProfile.jsx";
// import ValidationForms from "views/Forms/ValidationForms.jsx";
// import VectorMap from "views/Maps/VectorMap.jsx";
// import Widgets from "views/Widgets/Widgets.jsx";
// import Wizard from "views/Forms/Wizard.jsx";

// @material-ui/icons
// import Apps from "@material-ui/icons/Apps";
// import DateRange from "@material-ui/icons/DateRange";
// import GridOn from "@material-ui/icons/GridOn";
// import Image from "@material-ui/icons/Image";
// import Place from "@material-ui/icons/Place";
// import Timeline from "@material-ui/icons/Timeline";
// import WidgetsIcon from "@material-ui/icons/Widgets";

import DashboardIcon from "@material-ui/icons/Dashboard";
import OptionPage from "components/option/OptionPage.jsx";
import ItemPage from "components/item/ItemPage.jsx";
var dashRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: DashboardIcon,
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  {
    collapse: true,
    name: "Configurações",
    icon: DashboardIcon,
    state: "configCollapse",
    views: [
      {
        path: "/configuration/options",
        name: "Opções",
        mini: "O",
        component: OptionPage,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/configuration/item",
    name: "Item",
    component: ItemPage,
    layout: "/admin",
    invisible: true
  }
  // ,
  // {
  //   collapse: true,
  //   name: "Pages",
  //   icon: Image,
  //   state: "pageCollapse",
  //   views: [
  //     {
  //       path: "/pricing-page",
  //       name: "Pricing Page",
  //       mini: "PP",
  //       component: PricingPage,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/timeline-page",
  //       name: "Timeline Page",
  //       mini: "T",
  //       component: TimelinePage,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/login-page",
  //       name: "Login Page",
  //       mini: "L",
  //       component: LoginPage,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/register-page",
  //       name: "Register Page",
  //       mini: "R",
  //       component: RegisterPage,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/lock-screen-page",
  //       name: "Lock Screen Page",
  //       mini: "LS",
  //       component: LockScreenPage,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/user-page",
  //       name: "User Profile",
  //       mini: "UP",
  //       component: UserProfile,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/error-page",
  //       name: "Error Page",
  //       mini: "E",
  //       component: ErrorPage,
  //       layout: "/auth"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Components",
  //   icon: Apps,
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       collapse: true,
  //       name: "Multi Level Collapse",
  //       mini: "MC",
  //       state: "multiCollapse",
  //       views: [
  //         {
  //           path: "/buttons",
  //           name: "Buttons",
  //           mini: "B",
  //           component: Buttons,
  //           layout: "/admin"
  //         }
  //       ]
  //     },
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       mini: "I",
  //       component: Icons,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Forms",
  //   icon: "content_paste",
  //   state: "formsCollapse",
  //   views: [
  //     {
  //       path: "/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/wizard",
  //       name: "Wizard",
  //       mini: "W",
  //       component: Wizard,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Tables",
  //   icon: GridOn,
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/react-tables",
  //       name: "React Tables",
  //       mini: "RT",
  //       component: ReactTables,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Maps",
  //   icon: Place,
  //   state: "mapsCollapse",
  //   views: [
  //     {
  //       path: "/google-maps",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/full-screen-maps",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/vector-maps",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   path: "/widgets",
  //   name: "Widgets",
  //   icon: WidgetsIcon,
  //   component: Widgets,
  //   layout: "/admin"
  // },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   icon: Timeline,
  //   component: Charts,
  //   layout: "/admin"
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   icon: DateRange,
  //   component: Calendar,
  //   layout: "/admin"
  // }
];
export default dashRoutes;
