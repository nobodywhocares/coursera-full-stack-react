/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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

function RenderComments({comments}) {
    if (comments) {
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
            </div>
            );
    }
    return (<p><i>No comments recorded yet</i></p>);
}

function RenderDetail({dish, comments}) {
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
                        <RenderComments comments={comments} />
                    </div>
                </div>
            </div>
            );
    }
    return (<div/>);
}

const DishDetail = (props) => {
    return <RenderDetail dish={props.dish} comments={props.comments}/>;
};


export default DishDetail;