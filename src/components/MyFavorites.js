import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import CardForMyFav from './CardForMyFav'
import FormForUpdate from './FormForUpdate'
class MyFavorites extends React.Component {
  constructor(props){
    super(props)
    this.state={
      src:[],
      showModel:false,
      srcObj:{}
    }
  }
  componentDidMount = async ()=>{
    const { user} = this.props.auth0;
    let newData= await axios.get(`${process.env.REACT_APP_SERVER}/get?email=${user.email}`)
    this.setState({
      src:newData.data
    })
  }
  delete =(ID)=>{
    const { user} = this.props.auth0;
    let url= `${process.env.REACT_APP_SERVER}/delete?email=${user.email}&ID=${ID}`
    axios.delete(url).then(newData=>{
      this.setState({
        src:newData.data
      })
    })
  }
  showForForm = (item)=>{
    this.setState({
      showModel:true,
      srcObj:item
    })
  }
  update =(event)=>{
    event.preventDefault();
    const { user} = this.props.auth0;
    let data = {
      email:user.email,
      title:event.target.title.value,
      image:event.target.image.value,
      ID:this.state.srcObj._id
    }
    axios.put(`${process.env.REACT_APP_SERVER}/put`,data).then(newData=>{
      this.setState({
        src:newData.data
      })
    })
  }
  close =()=>{
    this.setState({
      showModel:false
    })
  }

  // showMessage = ()=>{
  //   if(this.state.src.length === 0){
  //     <h1>No Data</h1>
  //   }else 
  // }
  render() {
    return(
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        
        {this.state.src.length === 0 ? <h4 style={{textAlign:'center'}}>Your List is Empty ¯_(ツ)_/¯</h4> :
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {this.state.src.map((item,index)=>{
          return <CardForMyFav show={this.showForForm} delete={this.delete} data={item} key={index}/>
        })}
  </div>
    }
  

        
        {this.state.showModel &&
        <>
        <FormForUpdate close={this.close} data={this.state.srcObj} update={this.update}/>
        </>
        }
      </>
    )
  }
}

export default withAuth0(MyFavorites);
