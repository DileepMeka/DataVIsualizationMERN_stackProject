import { Component } from "react"
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from "recharts"
import "./index.css"

class Piechart extends Component {


  getRandomHexColor=()=> {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

    return color;
  }

    render(){
      
      const {data,nothin} = this.props
      const cells = Object.keys(data).map((key) => {
        const color = this.getRandomHexColor()
        return(<Cell name={`${data[key]["value"]}`} key={data[key]} fill={`${color}`} />)
      });

    
        return (
        <ResponsiveContainer className="chart" width="40%" height={300}>
          <PieChart>
            <text style={{fill:"red"}} className="piechart-heading" x={50} y={30} textAnchor="middle" dominantBaseline="middle">
              {nothin.toUpperCase()}
            </text>

            <Pie
              cx="50%"
              cy="40%"
              data={data}
              startAngle={0}
              endAngle={360}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >

              {cells}

            </Pie>
            <Tooltip />
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </PieChart>
    
            
          
        </ResponsiveContainer>
    
    
      )
        }
    }
    
    export default Piechart