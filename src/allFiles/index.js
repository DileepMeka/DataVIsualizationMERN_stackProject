import { Component } from "react";
import {Link} from "react-router-dom"
import "./index.css"

class AllFiles extends Component{

    state= {
        allFiles: []
    }

    componentDidMount(){
       this.callGetData()
    }

    callGetData = async ()=>{
        const allFiles= await this.getData()
        this.setState({
            allFiles 
        })  
       console.log(allFiles)  
    }

    getData= async ()=>{
        const response = await fetch("http://localhost:3000/data")
        const data = await response.json()

        const files =[]

        for(let i of data){
            files.push(i["textData"]);
        }

        const uniqueFiles= [...new Set(files)]
        return uniqueFiles

    }

    render(){

        const {allFiles}=  this.state;

        return(
            <div className="container">
                <div className="all-files-container">
                    {allFiles.map(item=>(
                        <div key= {item}>
                            <h1>{item}</h1>
                            <Link className="link" to={`/charts/${item}`}><button className="visit-file">Visualize</button></Link>
                        </div>
                    ))}
                </div>
            </div>
            
        )

    }

}

export default AllFiles