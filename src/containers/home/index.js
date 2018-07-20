import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import validate from 'validate-by-health';
import { setRuntimeVariable } from '~/actions/user';
import history from '~/core/history';
import blackwhite from './blackwhite.png';

import s from './scss';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			textInp: '',
			runtimeVariable: 'this is a runtimeVariable',
			error: null
		};
	}

	onSubmit = () => {
		const error = validate({
			VChinese: [this.state.textInp, '请输入汉字']
		});
		if (error) {
			this.setState({
				error
			});
			return;
		}
		this.setState({
			error: null
		});
		window.localStorage.setItem('querry', this.state.textInp);
		setTimeout(() => history.push('/details') );
	}

	onTextChange = (e) => {
		this.setState({
			textInp: e.target.value
		});
	}


	render() {
		const {error} = this.state;
		return (
			<div class={s.home}>
				<div className="formBox">
					<div className="w9 center pdt2">
						<div className="al-c pdb2 pdt2">
							<img src={blackwhite} className="w4" />
						</div>
						{error && <div className="al-c pd-1 bg-red white al-c radius-smaller mgb-5">{error}</div>}
						<input className="ww mgb1" onChange={this.onTextChange} type="text"/>
						<button className="white bg-gray pd-5 ww radius-smaller" onClick={this.onSubmit}>确定</button>
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
