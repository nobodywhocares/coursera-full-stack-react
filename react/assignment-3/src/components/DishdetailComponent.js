/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import React, { Component, useState } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Label, Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


    
function createCommentDisplayDate(dateRaw) {
    return new Date(dateRaw).toLocaleDateString('en-US',
        {year: 'numeric', month: 'short', day: 'numeric'});
    // Alternative more verbose technique presented in reading exercise
    // new Intl.DateTimeFormat('en-US',
    //     { year: 'numeric', month: 'short', day: '2-digit'}).format(
    //         new Date(Date.parse(comment.date)))
}

function RenderDish({dish}) {
    return (
        <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
        </Card>
        );
}

function RenderComments({dishId, comments, commentFormHandler}) {
    if (comments && comments.length) {
        const commentId = comments[comments.length-1].id+1;
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    { comments.map((comment, idx) => (
                                    <li key={'comment' + idx}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, {createCommentDisplayDate(comment.date)}</p>
                                    </li>
                                    ))}
                </ul>
                <CommentForm dishId={dishId} commentId={commentId} submitHandler={commentFormHandler}/>
            </div>
            );
    }
    return (<p><i>No comments recorded yet</i></p>);
}

function RenderDetail({dish, comments, commentFormHandler}) {
    if (dish) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
            
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments dishId={dish.id} comments={comments} commentFormHandler={commentFormHandler}/>
                    </div>
                </div>
            </div>
            );
    }
    return (<div/>);
}

const DishDetail = (props) => {
    const [comments, setComments] = useState([...props.comments]);
    const commentFormHandler = (newComment) => {
        // Must create new array otherwise comments subcomponent 
        // won't detect change (rerender)
        const newComments = [...comments, newComment];
        setComments(newComments);
    };
    return <RenderDetail dish={props.dish} comments={comments} commentFormHandler={commentFormHandler}/>;
};


export default DishDetail;


/* Comment Form input validators */
const requiredValidator = (val) => val && val.trim().length;
const minLenValidator = (len) => (val) => val && (val.trim().length >= len);
const maxLenValidator = (len) => (val) => !val || (val.trim().length <= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        const newComment = {
            id: this.props.commentId,
            dishId: this.props.dishId,
            comment: values.comment,
            rating: values.rating,
            author: values.name,
            date: new Date().toString()     
        };
        this.props.submitHandler(newComment);
        this.toggleModal();
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rating" defaultValue="1" className="form-control" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                <Control.text model=".name" id="name" className="form-control" name="name" placeholder="Your Name"
                                              validators={{requiredValidator, minLenValidator: minLenValidator(3), maxLenValidator: maxLenValidator(15)}}/>
                                <Errors className="text-danger" model=".name" show="touched"
                                        messages={{
                                            requiredValidator: 'Required. ',
                                            minLenValidator: 'Must be greater than 2 characters. ',
                                            maxLenValidator: 'Must be 15 characters or less. '
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                <Control.textarea model=".comment" id="comment" rows="6" className="form-control" name="comment" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Button type="cancel" onClick={this.toggleModal} style={{marginRight:'10px'}}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}
