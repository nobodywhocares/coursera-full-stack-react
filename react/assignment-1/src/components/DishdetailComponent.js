/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';


class DishDetail extends Component {

    createCommentDisplayDate(dateRaw) {
        return new Date(dateRaw).toLocaleDateString('en-US',
                    {year: 'numeric', month: 'short', day: 'numeric'});
        // Alternative more verbose technique presented in reading exercise
        // new Intl.DateTimeFormat('en-US',
        //     { year: 'numeric', month: 'short', day: '2-digit'}).format(
        //         new Date(Date.parse(comment.date)))
    }

    renderDish(dish) {
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

    renderComments(comments) {
        if (comments) {
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                    { comments.map((comment) => (
                        <li>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {this.createCommentDisplayDate(comment.date)}</p>
                        </li>
                    ))};
                    </ul>
                </div>
            );
        }
        return (<p><i>No comments recorded yet</i></p>);
    }

    renderDetail(dish) {
        if (dish) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        { this.renderDish(dish) }
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        { this.renderComments(dish.comments) }
                    </div>
                </div>
            );
        }
        return (<div/>);
    }
    
    render() {
        return this.renderDetail(this.props.dish);
    }

};

export default DishDetail;