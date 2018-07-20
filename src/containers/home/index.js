import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { setRuntimeVariable } from '~/actions/user';
import history from '~/core/history';

import s from './scss';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			textInp: '',
			runtimeVariable: 'this is a runtimeVariable'
		};
	}

	onSubmit = () => {
		window.localStorage.setItem('querry', this.state.textInp);
		setTimeout(() => history.push('/details') );
	}

	onTextChange = (e) => {
		this.setState({
			textInp: e.target.value
		});
	}


	render() {
		return (
			<div class={s.home}>
				<div className="formBox">
					<div className="w9 center pdt2">
						<input className="ww mgb1" onChange={this.onTextChange} type="text"/>
						<button className="white bg-green pd-5 ww radius-smaller" onClick={this.onSubmit}>确定</button>
					</div>
				</div>
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
