import React from 'React';
import React-Dom from 'React-DOM';
import axios from 'axios';

export class main extends React.COMPONENT{
  constructor(super){
    this.state : {
      searchText: '',
      data : [],
      user : ''
    }
  
  handleChange(){
    var searchText = document.getElementByClassNames('Search')[0].value;
    if(searchText.length>3){
      var url = "https://api.github.com/search/users?q="+searchText;
      axios.get(url)
        .then(response){
          for(var i=0;i<response.data.users.length;i++){
            if(response.data.users[i].substring(searchText)){
            this.setState({
              searchText: response.data.users[i].data.key;
              data:response.data.users[i].data
            })
            }
          }
          
        }catch(e){
          console.log("Error");
        }
    }
  }
   
  handleClick(className){
    var text = document.getElementByClassNames(className).innerText;
    var url = "https://api.github.com/search/users?q="+text;
    window.location.href = url;
  }
   
  render(){
    var dataJson = this.state.data;
    return(
    <div>
      <h1>Search,Auto-Complete & Details of Github users</h1>
      <input type="search" className="Search" value={this.state.searchText} onChange={this.handleChange.bind(this)} />
      <div className="displayData">
        <p className="api" onClick={this.handleClick.bind(this,'api')}>{this.state.dataJson.API}</p>
        <p className="key" onClick={this.handleClick.bind(this,'key')}>{this.state.dataJson.Key}</p>
         <div className="jsonData"> 
          <p className="avatar" onClick={this.handleClick.bind(this,'avatar')}>{this.state.dataJson.AvatarImage}</p>
          <p className="type" onClick={this.handleClick.bind(this,'type')}>{this.state.dataJson.Type}</p>
          <p className="repos" onClick={this.handleClick.bind(this,'repos')}>{this.state.dataJson.Repos}</p>
          <p className="followers" onClick={this.handleClick.bind(this,'followers')}>{this.state.dataJson.Followers}</p>
         </div>      
      </div>
    </div>

    )
  }
