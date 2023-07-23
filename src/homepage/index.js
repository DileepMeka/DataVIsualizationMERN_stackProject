import { Component } from "react";
import {Link} from "react-router-dom";
import "./index.css"


class Home extends Component{

    render(){
        return (
            <div className="home">
                <div className="img-container"> 
                    {/* <img src="https://res.cloudinary.com/dhrxxm585/image/upload/v1690091810/10-types-of-data-visualization-1-1024x614_qonshd.jpg" /> */}
                </div>
                <div className="content-container">
                <h1>Hello.! Welcome..!</h1>
                <div>
                    
                <Link className="link" to="/upload">
                <button>Upload New file</button>
                </Link>
                
                
                <Link className="link" to="/allFiles">
                <button>show All Files</button>
                </Link>
                
                </div>
                </div>
            </div>
        )
    }
}


export default Home ; 