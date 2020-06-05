import React from 'react';
import config from './config';
import './App/App.css';
import ApiContext from './ApiContext';

class AddForm extends React.Component{
  static contextType = ApiContext;
  state = {
    folderName: ''
  }

  onChange = input => {
    this.setState({folderName: input});
  };

  onSubmit = event => {
    console.log(this.state.folderName);
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": this.state.folderName
      })
    })
    .then(res => res.ok?res.json():Promise.reject('Got error'))
    .then(newFolder => {
      console.log(newFolder);
      this.props.history.push('/');
      this.context.updateState(newFolder);
    })
    .catch(error => {
      console.log(error)
    });
    

  };

  validateName = () => {
    let name = this.state.folderName;
    if (name.length === 0){
      return "Folder Name Cannot Be Empty";
    }
  };

  render(){
    return (
      <section>
      <form id = "addFolder">
        <label htmlFor ="folderName">Folder Name</label> <br/>
        <label className = "error">{this.validateName()}</label> <br/>
        <input id = "folderName" type = "text" value = {this.state.folderName} onChange= {e => this.onChange(e.target.value)} required /> <br/>
        <button disabled = {this.validateName()} type = "submit" className="submitButton" onClick = {this.onSubmit}>Create New Folder</button>
      </form>
    </section>
    );
  }
}

export default AddForm;