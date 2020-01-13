import React,{Component} from 'react';
import './weather.scss';
import Form from './form.js';
import { Button } from 'react-bootstrap';

const APIKEY ="8f95342839eba25e1121275e142e4225";

export default class weather extends Component {
    
    constructor(props){
        super(props);
        this.state={
            loading: false,
            city: undefined,
            list:[],
            celsius: undefined,
            date: [],
            weather:[],
            iconlist:[],
            icon: undefined,
            error: undefined
        };
        this.weathericon = {
            sunny:"wi-day-sunny",
            cloudy:"wi-cloudy",
            rain:"wi-rain",
            snow:"wi-snow"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getWeather(city){
        try{
            const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`;
            const response = await fetch(url);
            const data = await response.json();
            
            this.setState({
                city: data.city.name,
                loading: true,
                list: data.list,
                celsius: this.findtemp(data.list),
                date: this.findDate(data.list),
                weather: this.findWeather(data.list),
                error: " "
            })
            var iconlist = [0,0,0,0,0];
            for(var x=0; x<5; x++){
                this.getIcon(this.weathericon,this.state.weather[x]);
                iconlist[x] = this.state.icon;
            }
            this.setState({ iconlist : iconlist});
        }catch{
            this.setState({
                error:"*Please enter the city",
                loading: false
            })
        }
    }

    getIcon=(icons,weather)=>{
        switch(weather){
            case 'Clouds': 
                this.setState({ icon: icons.cloudy });
                break;
            case 'Snow': 
                this.setState({ icon: icons.snow });
                break;
            case 'Rain': 
                this.setState({ icon: icons.rain });
                break;
            case 'Clear': 
                this.setState({ icon: icons.sunny });
                break;
            default:  
            break;
        }
    }
    findWeather=(list)=>{;
        var newlist = [];
        var newWeather = [];
        for(var a=0; a<list.length; a+=8){
            newlist.push(list.slice(a,a+8));           
        }
        var obj = {};
        var maxWeather;
        var maxNum = 0;
        for(var i=0; i<newlist.length; i++){
            for(var j=0;j<8;j++){
                var index = newlist[i][j]['weather'][0]['main'];
                obj[index] === undefined ? obj[index] = 1 : obj[index]++;
                if(obj[index] > maxNum){
                    maxWeather = index;
                    maxNum = obj[index];
                } 
            }
            newWeather[i] = maxWeather;
        }
        return newWeather;
    }

    findDate=(list)=>{
        var weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dates = list.map((item, i) => {
             return item.dt_txt.split(" ")[0];
        }).filter((item, i, arr) => { return arr.indexOf(item) === i; });

        var day = new Array(dates.length);
        for(var i=0; i<dates.length; i++){
            day[i] = weekdays[new Date(Date.parse(dates[i].replace(/-/g, "/"))).getDay()];
        }
        return day;
    }

    findtemp=(list)=>{
        var newlist=[0,0,0,0,0];
        for(var i=0; i<list.length; i++){
            newlist[Math.floor(i / 8)] += list[i]['main']['temp'];
        }
        for(var a in newlist){
            newlist[a] /= 8;
            newlist[a] -= 273.15;
        }
        var b = 0;
        while(b < 5){
            newlist[b] = newlist[b].toFixed(2);
            b++
        }
        return newlist;
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.getWeather(e.target.city.value);
    }
    render() {
        return (
          <div className="container">
                <form onSubmit={this.handleSubmit}> 
                    <div className="top">
                        <div className="formGroup">
                            <input
                                className="cityInput"
                                type="text"
                                name="city"
                                placeholder="Search a city"
                            />
                            <Button className="btn" type="submit" variant="secondary">Get Weather</Button>
                        </div>
                        <div className="error">{this.state.error}</div>
                    </div>
                </form>
                { this.state.loading ?
                <Form
                    celsiusDay ={ this.state.celsius}
                    date = {this.state.date}
                    icon= {this.state.iconlist}
                /> : null}
            </div>
        )             
      };
    }