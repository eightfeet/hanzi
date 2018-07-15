import { h, Component } from 'preact';
import { Router } from 'preact-router';
import '~/style/global.common';
import history from '~/core/history';
import Home from '~/containers/home';
import Details from '~/containers/details';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRoute} history={history}>
					<Home path="/" />
					<Details path="/details/" user="me" />
				</Router>
			</div>
		);
	}
}
