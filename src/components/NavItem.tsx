import React from "react";
import { RouteComponentProps, NavLink, withRouter } from "react-router-dom";

interface INavItemProps extends RouteComponentProps<any> {
  to: string;
  label: string;
}

let NavItem: React.FunctionComponent<INavItemProps> = ({
  location,
  to,
  label
}) => {
  const getNavLinkClass = path => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <li className={`nav-item ${getNavLinkClass(to)}`}>
      <NavLink to={to} exact className="nav-link">
        {label}
      </NavLink>
    </li>
  );
};

export default withRouter(NavItem);
