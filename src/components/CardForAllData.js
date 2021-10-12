import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
class CardForAllData extends React.Component {
    addButton =()=>{
        this.props.add(this.props.data)
    }
    render() {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.data.image} />
                    <Card.Body>
                        <Card.Title>{this.props.data.title}</Card.Title>
                        <Button variant="primary" onClick={this.addButton}>Add-to-favorite</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }
}
export default CardForAllData;