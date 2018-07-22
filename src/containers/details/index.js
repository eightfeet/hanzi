import { h, Component } from 'preact';
import { slope } from './helper';
import history from '~/core/history';
import s from './style.scss';

class Details extends Component {

	constructor(props) {
		super(props);
		this.state = {
			originData: [],
			showlist: []
		};
		this.itemWidth = null;
		this.startPos = null;
		this.tranbox = null;
		this.direction = 'next';
		this.touchX = {
			start: null,
			end: null
		};
		this.touchY = {
			start: null,
			end: null
		};
	}

	componentWillMount () {
		this.itemWidth = Math.min(window.innerWidth, window.innerHeight);
		this.startPos = this.itemWidth * -2;
	}

	componentDidMount() {
		this.init();
	}

	setData = () => {
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

	init = () => {
		this.tranbox.style.left = `${this.startPos}px`;
		this.tranbox.setAttribute('data-index', 0);
		let text = window.localStorage.getItem('querry');

		if (!text) {
			history.push('/');
			text = '';
			return;
		}

		if (text.length < 6) {
			for (let index = 0; index < 6; index++) {
				text += text;
			}
		}

		text = text.split('');
		this.setState({
			originData: text
		}, this.setData);
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
		});
	}

	oprationDataIndex = () => {
		const {originData} = this.state;
		const index = parseInt(this.tranbox.getAttribute('data-index'), 0);
		let opreatIndex = null;
		if (this.direction === 'next') {
			opreatIndex = index + 1;
			if (opreatIndex >= originData.length) {
				opreatIndex = 0;
			}
			this.tranbox.setAttribute('data-index', opreatIndex);
		}
		if (this.direction === 'last') {
			opreatIndex = index - 1;
			if (index <= 0) {
				opreatIndex = originData.length - 1 + index;
			} else {
				opreatIndex = index - 1;
			}
			this.tranbox.setAttribute('data-index', opreatIndex);
		}
	}

	handleLast = () => {
		this.onAddEventListener();
		this.direction = 'last';
		this.tranbox.style.transform = `translateX(${this.itemWidth}px)`;
		this.tranbox.style.transitionDuration = '1s';
	}

	handleNext = () => {
		this.onAddEventListener();
		this.direction = 'next';
		this.tranbox.style.transform = `translateX(-${this.itemWidth}px)`;
		this.tranbox.style.transitionDuration = '1s';
	}

	onTouchStart = (e) => {
		e.preventDefault();
		this.touchX = {
			start: null,
			end: null
		};
		this.touchY = {
			start: null,
			end: null
		};
		this.touchX.start = e.touches[0].screenX;
		this.touchY.start = e.touches[0].screenY;
	}

	onTouchMove = (e) => {
		this.touchX.end = e.touches[0].screenX;
		this.touchY.end = e.touches[0].screenY;
	}

	onTouchEnd = () => {
		const rate = slope(this.touchX.end - this.touchX.start, this.touchY.end - this.touchY.start, 30);

		if (rate !== -1) {
			return;
		}
		const { start, end } = this.touchX;
		if (start > end && start - end > 20) {
			this.handleNext();
		}
		if (start < end && end - start > 20) {
			this.handleLast();
		}
	}

	onError = (e) => {
		e.target.setAttribute('set', './assets/imgs/error.png');
	}

	render() {
		console.log(this.props.querry);
		const {showlist} = this.state;
		const tranboxStyle = {
			width: showlist.length * this.itemWidth,
			height:`${this.itemWidth}px`
		};
		const itemStyle = {width:`${this.itemWidth}px`, height:`${this.itemWidth}px` };
		const itemBox = {width:`${this.itemWidth}px`, height:`${this.itemWidth + 50}px` };
		return (
			<div class={s.root}>
				<div className={s.slidebox}
					style={itemBox}
					onTouchStart={this.onTouchStart}
					onTouchMove={this.onTouchMove}
					onTouchEnd={this.onTouchEnd}
				>
					<div ref={el=>{this.tranbox = el;}} className={`${s.tranbox} clearfix`} style={tranboxStyle}>
						{
							showlist.map((item) => (
								<div className={s.slideitem} style={itemBox}>
									<img onError={this.onError} src={`./assets/imgs/${item}.gif`}  style={itemStyle} />
									<p className="al-c pdt1">{item}</p>
								</div>
							))
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Details;
