import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

class AddNote extends React.Component {
	static contextType = ApiContext;

	state = {
		name: '',
		content: '',
		folderId: '0'
	}

	changeName = (name) => {
		this.setState({name:name});
	}

	changeContent = (content) => {
		this.setState({content:content});
	}

	changeFolder = (folderId) => {
		this.setState({folderId:folderId});
	}

	validateName = () => {
		if (this.state.name.length === 0){
			return true;
		}
	}

	validateContent = ()=> {
		if (this.state.content.length === 0){
			return true;
		}
	}

	validateFolder = () => {
		if (this.state.folderId === '0'){
			return true;
		}
	}

	submitNote = (event) => {
		event.preventDefault();
		fetch(`${config.API_ENDPOINT}/notes`, {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        name: this.state.name,
	        content: this.state.content,
	        folderId: this.state.folderId,
	        modified: new Date()
	      })
	    }).then(res => res.ok?res.json():Promise.reject('Got Error'))
	    .then(newNote => {
	    	this.props.history.push('/');
	    	this.context.updateNoteState(newNote);
	    })
	    .catch(error => console.error(error));
	}

	render(){
		const options = this.context.folders.map(folder => <option value={folder.id}>{folder.name}</option>)
		return (
			<form id='addNote'>
				<label>Note name</label> {this.validateName() && <span>Note Name Cannot Be Empty</span>} <br/>
				<input id='name' value={this.state.name}  onChange={e => this.changeName(e.target.value)}/><br/>
				<label>Note content</label> {this.validateContent() && <span>Content Name Cannot Be Empty</span>}<br/>
				<input id='content' value={this.state.content}  onChange={e => this.changeContent(e.target.value)}/><br/>
				<label>Note folder</label> {this.validateFolder() && <span>You have to select a folder</span>} <br/>
				<select onChange={(e) => this.changeFolder(e.target.value)} >
					<option value='0'>--Select folder--</option>
					{options}
				</select><br/>
				<button disabled={this.validateName() || this.validateContent() || this.validateFolder()} type="submit" onClick={this.submitNote}>Save</button>
			</form>
			)
	}
}

export default AddNote;