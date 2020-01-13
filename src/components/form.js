import React,{Component} from 'react';
import "./css/weather-icons.css";
import './form.scss';
import { Card, ListGroup } from 'react-bootstrap';

export default class form extends Component {

    createForm=() =>{
        var output = [];
        for(var i=0;i<5;i++){
            output.push(
                <Card key={i}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{this.props.date[i]}</ListGroup.Item>
                        <ListGroup.Item><i className={`wi ${this.props.icon[i]}`} /></ListGroup.Item>
                        <ListGroup.Item>{this.props.celsiusDay[i]}&deg;C</ListGroup.Item>
                    </ListGroup>
                </Card>
            );
        }
        return output;
    }

    render(){
        return(
            <div className="formContainer">
                {this.createForm()}
            </div>       
        )
    }
}