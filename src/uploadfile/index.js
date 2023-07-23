import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./index.css"

class UploadComponent extends Component {
  
    state = {
      selectedFile: null,
      textData: "",
      uploadCount:0,
      uploadStatus:false,
      file:""
    };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  handleTextDataChange = (event) => {
    const { value } = event.target;
    this.setState({ textData: value });
  };

  handleUpload = () => {
    const { selectedFile, textData } = this.state;
    if (selectedFile && textData) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("textData", textData);

      fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Upload failed");
          }
          this.setState((prevState)=>({
            uploadCount:prevState.uploadCount+1,
            uploadStatus:true,
            file:textData,
            textData:"",
            selectedFile:null
          }))
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  };

  render() {
    const { textData,selectedFile,file } = this.state;
    const fileName=selectedFile!==null? <h1 className="chosen-file">{selectedFile["name"]}</h1> : ""; 
    const {uploadCount,uploadStatus}= this.state;
    const viewButton = <button className="visualize">Visualize</button>
    const tryAgainButton=<button>Try Again</button>
    let button="";
    if(uploadCount>0 && uploadStatus){
      button= viewButton
    }
    else if(uploadCount>0 && !uploadStatus){
      button= tryAgainButton
    }

    let status= uploadStatus?<h1 className="status">Uploaded Successfully..!</h1>:"";

    

    return (
      <div className="upload-container">
        <div className="content-container">
          <div className="input-container">
            <h1 className="files-heading">Select Files</h1>
            {fileName}
            <input id="fileInput" className="file-input" type="file" accept=".xlsx" onChange={this.handleFileChange} />
            <label htmlFor="fileInput">Choose File</label>
            <input
              type="text"
              value={textData}
              onChange={this.handleTextDataChange}
              placeholder="Enter Name of File"
              className="file-text"
              required
            />

            {status}
            <button className="upload" onClick={this.handleUpload}>
              Upload
            </button>

            <Link to={`/charts/${file}`}>{button}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadComponent;