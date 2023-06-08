import React from "react";
import Hadir from "./assets/Hadir";
import PropTypes from "prop-types";
import Dashboard from "./assets/Dashboard";
import Absent from "./assets/Absent";
import AllReport from "./assets/AllReport";
import BusinessTrip from "./assets/BusinessTrip";
import Correct from "./assets/Correct";
import Leave from "./assets/Leave";
import Permit from "./assets/Permit";
import Overtime from "./assets/Overtime";
import Report from "./assets/Report";
import Management from "./assets/Management";
import Company from "./assets/Company";
import Sick from "./assets/Sick";
import Export from "./assets/Export";
import FeatherIcon from "feather-icons-react";
import SelfRegister from "./assets/SelfRegister";
import Position from "./assets/Position";
import Shifting from "./assets/Shifting";

const Icon = ({ variant, ...props }) => {
  const components = {
    hadir: Hadir,
    dashboard: Dashboard,
    absent: Absent,
    "all-report": AllReport,
    "business-trip": BusinessTrip,
    correct: Correct,
    leave: Leave,
    permit: Permit,
    overtime: Overtime,
    report: Report,
    management: Management,
    company: Company,
    sick: Sick,
    export: Export,
    "self-registration": SelfRegister,
    position: Position,
    shifting: Shifting,
  };
  if (components[variant]) {
    const Component = components[variant];

    return <Component {...props} />;
  }
  return <FeatherIcon icon={variant} {...props} />;
};

// Icon.propsTypes = {
// //   type: PropTypes.string().isRequired(),
// };
export default Icon;
