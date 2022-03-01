import React, { Component } from 'react';
import moment from 'moment';

class CountDownSimple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: null,
            minutes: null,
            hours: null,
            days: null,
        };
    }

    //CSD
    componentDidMount() {        
        this.interval = setInterval(() => {

            const { timeTillDate, timeFormat } = this.props;
            //const then =moment('12 13 2021, 11:59:59 pm',timeFormat);    
            const then = moment(timeTillDate, timeFormat);
            const now = moment();    
            
            const t1=then.diff(now,'days');
            const t2=then.diff(now,'hours')-(t1*24);
            const t3=then.diff(now,'minutes')-(t1*24*60)-(t2*60);
            const t4=then.diff(now,'seconds')-(t1*24*60*60)-(t2*60*60)-(t3*60);
                                                
            const days = t1;
            const hours = t2;
            const minutes = t3;
            const seconds = t4;

            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    render() {
        const { days, hours, minutes, seconds } = this.state;
        return (
            <ul className="ps-countdown">
                <li>
                    <span className="days mr-1">{days}</span>
                </li>
                <li>
                    <span className="hours ml-1 mr-1">{hours}</span>
                </li>
                <li>
                    <span className="minutes ml-1 mr-1">{minutes}</span>
                </li>
                <li>
                    <span className="seconds ml-1">{seconds}</span>
                </li>
            </ul>
        );
    }
}

export default CountDownSimple;
