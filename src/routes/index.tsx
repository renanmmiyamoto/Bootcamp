import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
	<Switch>
		<Route path="/" exact component={Dashboard} />
		<Route path="/repository/:full_name+" component={Repository} />
	</Switch>
);

export default Routes;
