import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import CardForAllData from './CardForAllData'

class AllDataAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            src: []
        }
    }
    componentDidMount = () => {
        let url = `${process.env.REACT_APP_SERVER}/data`
        axios.get(url).then(newData => {
            this.setState({
                src: newData.data
            })
        })
    }
    add = (allData) => {
        const { user } = this.props.auth0;
        let data = {
            email: user.email,
            title: allData.title,
            image: allData.image
        }
        axios.post(`${process.env.REACT_APP_SERVER}/post`, data)
    }
    render() {
        return (
            <>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {this.state.src.map((item, index) => {
                        return <CardForAllData add={this.add} data={item} key={index} />
                    })}
            </div>
                

            </>
        )
    }
}

export default withAuth0(AllDataAPI);
