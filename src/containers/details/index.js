import { h, Component } from 'preact';
import s from './style.scss';

export default class Details extends Component {

	constructor(props) {
		super(props);
		this.state = {
			originData: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
			showlist: [14,15,0,1,2],
			boxwidth: null,
			originTran: 0
		};
	}

	componentWillMount () {
		const boxwidth = Math.min(window.innerWidth, window.innerHeight);
		this.setState({
			boxwidth,
			originTran: boxwidth * -2
		});
		console.log(boxwidth);
	}

	render() {
		const {showlist, boxwidth, originTran} = this.state;
		const tranboxStyle = {
			width: showlist.length * boxwidth,
			height:`${boxwidth}px`,
			'-webkit-transform': `translateX(${originTran}px)`,
			transform: `translateX(-${originTran}px)`,
			'transition-duration': '1s'
		};
		const itemStyle = {width:`${boxwidth}px`, height:`${boxwidth}px` };
		return (
			<div class={s.root}>
				<div className={s.slidebox} style={itemStyle}>
					<div className={`${s.tranbox} clearfix`} style={tranboxStyle}>
						{
							showlist.map((item) => (<div className={s.slideitem} style={itemStyle}>{item}</div>))
						}
					</div>
				</div>
				details
			</div>
		);
	}
}

