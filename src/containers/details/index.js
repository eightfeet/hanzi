import { h, Component } from 'preact';
import s from './style.scss';

export default class Details extends Component {

	constructor(props) {
		super(props);
		this.state = {
			originData: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
			showlist: []
		};
		this.itemWidth = null;
		this.startPos = null;
		this.tranbox = null;
		this.direction = 'next';
	}

	componentWillMount () {
		this.itemWidth = Math.min(window.innerWidth, window.innerHeight);
		this.startPos = this.itemWidth * -2;
		const {originData} = this.state;
		let showlist = [];
		if (originData.length <= 5) {
			showlist = originData;
		} else {
			showlist = [...originData.slice(originData.length - 2, originData.length),...originData.slice(0, 3)];
		}
		this.setState({
			showlist
		});

	}

	componentDidMount() {
		this.init();
	}

	init = () => {
		this.tranbox.style.left = `${this.startPos}px`;
		this.tranbox.setAttribute('data-index', 0);
	}

	onAddEventListener = () => {
		this.tranbox.addEventListener('transitionend', this.handleTransformEnd);
	}

	onRemoveListener = () => {
		this.tranbox.removeEventListener('transitionend', this.handleTransformEnd);
	}

	handleTransformEnd = () => {
		this.onRemoveListener();
		const {showlist, originData} = this.state;
		const currentInd = parseInt(this.tranbox.getAttribute('data-index'), 0);
		let newList = [];
		let index = null;
		if (this.direction === 'next') {
			index = (currentInd + 3) % originData.length;
			newList = [...showlist.slice(1, showlist.length), originData[index]];
		}
		if (this.direction === 'last') {
			const dataindex = currentInd - 3;
			if (dataindex < 0) {
				index = originData.length + dataindex;
			} else {
				index = dataindex;
			}
			newList = [originData[index], ...showlist.slice(0, showlist.length - 1)];
		}
		this.setState({
			showlist: newList
		}, () => {
			this.tranbox.style.transform = 'translateX(0px)';
			this.tranbox.style.transitionDuration = '0s';
			this.oprationDataIndex();
			console.log(this.state.showlist);
		});
	}

	oprationDataIndex = () => {
		const {originData} = this.state;
		const index = parseInt(this.tranbox.getAttribute('data-index'), 0);
		let opreatIndex = null;
		if (this.direction === 'next') {
			opreatIndex = index + 1;
			if (opreatIndex > originData.length) {
				opreatIndex = 0;
			}
			this.tranbox.setAttribute('data-index', opreatIndex);
		}
		if (this.direction === 'last') {
			opreatIndex = index - 1;
			console.log('opreatIndex', opreatIndex);
			if (opreatIndex < 0) {
				opreatIndex = originData.length;
			}
			console.log('opreatIndex', opreatIndex);
			this.tranbox.setAttribute('data-index', opreatIndex);
		}
	}

	handleLast = () => {
		this.onAddEventListener();
		this.direction = 'last';
		this.tranbox.setAttribute('data-index', 0);
		this.tranbox.style.transform = `translateX(${this.itemWidth}px)`;
		this.tranbox.style.transitionDuration = '1s';
	}

	handleNext = () => {
		this.onAddEventListener();
		this.direction = 'next';
		this.tranbox.style.transform = `translateX(-${this.itemWidth}px)`;
		this.tranbox.style.transitionDuration = '1s';
	}

	render() {
		const {showlist} = this.state;
		const tranboxStyle = {
			width: showlist.length * this.itemWidth,
			height:`${this.itemWidth}px`
		};
		const itemStyle = {width:`${this.itemWidth}px`, height:`${this.itemWidth}px` };
		return (
			<div class={s.root}>
				<div className={s.slidebox} style={itemStyle}>
					<div ref={el=>{this.tranbox = el;}} className={`${s.tranbox} clearfix`} style={tranboxStyle}>
						{
							showlist.map((item) => (<div className={s.slideitem} style={itemStyle}>{item}</div>))
						}
					</div>
				</div>
				<button onClick={this.handleLast}>上一页</button>
				<button onClick={this.handleNext}>下一页</button>
			</div>
		);
	}
}
