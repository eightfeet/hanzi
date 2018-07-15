import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { setRuntimeVariable } from '~/actions/user';

import s from './scss';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			provinces: [],
			runtimeVariable: 'this is a runtimeVariable'
		};
	}


	render() {
		return (
			<div class={s.home}>
				index
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({ setStore: setRuntimeVariable}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
