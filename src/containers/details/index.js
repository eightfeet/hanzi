import { h, Component } from 'preact';
import s from './style.scss';

export default class Details extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount () {
	}

	render() {
		return (
			<div class={s.root}>
				details
			</div>
		);
	}
}

