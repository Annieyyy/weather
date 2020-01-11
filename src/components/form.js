import React,{Component} from 'react';

export default class form extends Component {


    render(){
        return(
            <div className="form" >
                <div className="output"> City: {this.props.city}</div>
                <div className="output"> {this.props.date1} celsius: {this.props.celsiusDay1}</div>
                <div className="output"> {this.props.date2} celsius: {this.props.celsiusDay2}</div>
                <div className="output"> {this.props.date3} celsius: {this.props.celsiusDay3}</div>
                <div className="output"> {this.props.date4} celsius: {this.props.celsiusDay4}</div>
                <div className="output"> {this.props.date5} celsius: {this.props.celsiusDay5}</div>
                <div className="output"> {this.props.error}</div>
            </div>
                
        )
    }
}