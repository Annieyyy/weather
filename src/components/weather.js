import React,{Component} from 'react';
import './weather.css';
import Form from './form.js';

const APIKEY ="8f95342839eba25e1121275e142e4225";

export default class weather extends Component {
    
    constructor(props){
        super(props);
        this.state={
            loading: false,
            city: undefined,
            list:[],
            findtemp: [],
            celsius: undefined,
            date: [],
            error: undefined

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getWeather (city){
        console.log(city);
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({
            city: data.city.name,
            loading: true,
            list: data.list,
            celsius: this.findtemp(data.list),
            date: this.findDate(data.list),
            weather: this.findWeather(data.list),
            error: " "
            })
            console.log("list:",this.state.list);
            console.log("celsius:",this.state.celsius);

    }
    findWeather=(list) =>{
        console.log("weather:",list[0]['weather'][0]['main']);

        var newWeather = new Array(5);
        for(var j =0; j<5; j++){
            newWeather[j] = 0;
        }
        for(var i=0; i< list.length; i++){
            newWeather[i] = list[i]['weather'][0]['main'];
        }
        console.log(newWeather);
    }

    findDate=(list) =>{
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dates = list.map((item, i) => {
             return item.dt_txt.split(" ")[0];
        }).filter((item, i, arr) => { return arr.indexOf(item) === i; });

        console.log('dates', dates);
        var day = new Array(dates.length);
        for(var i=0; i<dates.length; i++){
            day[i] = weekdays[new Date(dates[i]).getDay()];

        }
        return day;
    }

    findtemp=(list)=>{
        var newlist = new Array(5);
        for(var j =0; j<5; j++){
            newlist[j] = 0;
        }
        console.log(newlist);
        for(var i=0; i< list.length; i++){
            newlist[Math.floor(i / 8)] += list[i]['main']['temp'];
        }
        console.log("list:", newlist);
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

        handleSubmit=(e) =>{
            e.preventDefault();
            this.getWeather(e.target.city.value);

        }
        render() {
        return (
          <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="city"
                  placeholder="Search a City..."
                  ref="city"
                />
                <button>Get Weather</button>
              </form>
              { this.state.loading ?
                <Form
                    city ={this.state.city}
                    celsiusDay1 ={this.state.celsius[0]}
                    celsiusDay2 = {this.state.celsius[1]}
                    celsiusDay3 = {this.state.celsius[2]}
                    celsiusDay4 = {this.state.celsius[3]}
                    celsiusDay5 = {this.state.celsius[4]}
                    date1 = {this.state.date[0]}
                    date2 = {this.state.date[1]}
                    date3 = {this.state.date[2]}
                    date4 = {this.state.date[3]}
                    date5 = {this.state.date[4]}
                /> : null}
          </div>


        )

      };
    }