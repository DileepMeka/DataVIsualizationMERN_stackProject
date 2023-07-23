import {Component} from "react"

import Piechart from "../chart";

class PiechartProcess extends Component {

    constructor(props) {
    super(props);
    this.state = {
      counteddata: null, // Initialize state to null until data is ready
    };
  }

  async componentDidMount() {
    // Call getData inside componentDidMount to get the data when the component mounts
    const filesData = await this.getData();
    this.countData(filesData).then((counteddata) => {
      this.setState({ counteddata }); // Set the state with the result of countData
    });
  }


    headings=""

    getData = async () => { 

        const { match } = this.props
        const { params } = match
        const { textData } = params
        const response = await fetch(`http://localhost:3000/data/${textData}`)
        const jsonData = await response.json()
        return jsonData ;
      };

      

      countData = async (filesData) => {
        const headers = filesData[0]["headers"];
        this.headings = headers;
        const headersObject = {}
        for (let i=1;i<headers.length;i++){
            headersObject[headers[i]]= []
        }
        for (let i=1;i<headers.length;i++){
            for (let j of filesData){
                headersObject[headers[i]].push(j["data"][0][headers[i]])
            }
        }

        const uniqueHeaderObjects={}
        for(let i=1;i<headers.length;i++){
            uniqueHeaderObjects[headers[i]]=[...new Set (headersObject[headers[i]]) ]
        }

        const columnValuesAndCountObject= {}

        for (let i=1;i<headers.length;i++){
            columnValuesAndCountObject[headers[i]]= []
        }

        for (let i=1;i<headers.length;i++){
            for(let j=0;j<uniqueHeaderObjects[headers[i]].length;j++){

                const arr = headersObject[headers[i]] ;

                const count = arr.filter((item) => item === uniqueHeaderObjects[headers[i]][j]).length;

                const tempObject= {
                    value: uniqueHeaderObjects[headers[i]][j],
                    count : count
                }

                columnValuesAndCountObject[headers[i]].push(tempObject)
            }
        }
        return (columnValuesAndCountObject)

      }

   render(){ 

    const { counteddata } = this.state; // Get the data from state

    // Check if the data is still null (loading state)
    if (counteddata === null) {
      return <div>Loading...</div>;
    }

    const piecharts = [];

    for (const key in counteddata) {
      const piechart = <Piechart className="etc" data={counteddata[key]} key={key} nothin={key} />;
      piecharts.push(piechart);
    }

    return <div className="chartPage">{piecharts}</div>;
  }
    }


export default PiechartProcess