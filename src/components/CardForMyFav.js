import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
class CardForMyFav extends React.Component {
    deleteButton =()=>{
        this.props.delete(this.props.data._id)
    }
    updateButton=()=>{
        this.props.show(this.props.data)
    }
    render() {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.data.image} />
                    <Card.Body>
                        <Card.Title>{this.props.data.title}</Card.Title>
                        <Button variant="primary" onClick={this.deleteButton}>Delete</Button>
                        <Button variant="primary" onClick={this.updateButton}>Update</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }
}
export default CardForMyFav;