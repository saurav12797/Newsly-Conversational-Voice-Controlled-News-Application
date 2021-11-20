import React, { FC } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as appRoutes from "./routeConstants/appRoutes";
import AuthWrapper from "../views/Auth/AuthWrapper";
import isAuthenticated from "../shared/components/HOC/requireAuth";
import Home from "../views/Home";
import { RouterProps } from "../shared/types/route.type";

export const appHistory = createBrowserHistory();

const AppRoutes = () => {
    const routes: RouterProps[] = [
        { exact: false, path: appRoutes.AUTH, component: AuthWrapper },
        { exact: true, path: appRoutes.HOME, component: isAuthenticated(Home) },
    ];

	return (
		<div>
			<Router history={appHistory}>
				<Switch>
					{routes.map((route, index) => (
						<Route
							key={index}
							{...route}
							component={route.component as FC}
						/>
					))}
					<Route
						path="*"
						render={() => <Redirect to={appRoutes.LOGIN} />}
					/>
				</Switch>
			</Router>
		</div>
	);
};

export default AppRoutes;
