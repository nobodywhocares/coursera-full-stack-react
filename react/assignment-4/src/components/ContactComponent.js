/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const requiredValidator = (val) => val && val.trim().length;
const maxLenValidator = (len) => (val) => !(val) || (val.trim().length <= len);
const minLenValidator = (len) => (val) => val && (val.trim().length >= len);
const numberValidator = (val) => !isNaN(Number(val));
const emailValidator = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Contact extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.postFeedback(values);
        this.props.resetFeedbackForm();
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3> Send us Yor Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                <Control.text model=".firstname" id="firstname" className="form-control"
                                              name="firstname" placeholder="First Name"
                                              validators={{requiredValidator, minLenValidator: minLenValidator(2), maxLenValidator: maxLenValidator(50)}} />
                                <Errors className="text-danger" model=".firstname" show="touched"
                                        messages={{
                                                requiredValidator: 'Required. ',
                                                minLenValidator: 'Must be at least 2 characters. ',
                                                maxLenValidator: 'Must be 50 characters or less. '
                                            }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                <Control.text model=".lastname" id="lastname" className="form-control" name="lastname" placeholder="Last Name"
                                              validators={{requiredValidator, minLenValidator: minLenValidator(2), maxLenValidator: maxLenValidator(50)}}/>
                                <Errors className="text-danger" model=".lastname" show="touched"
                                        messages={{
                                                requiredValidator: 'Required. ',
                                                minLenValidator: 'Must be at least 2 characters. ',
                                                maxLenValidator: 'Must be 50 characters or less. '
                                            }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                <Control.text model=".telnum" id="telnum" className="form-control" name="telnum" placeholder="Tel. Num"
                                              validators={{requiredValidator, minLenValidator: minLenValidator(9), maxLenValidator: maxLenValidator(15), numberValidator}}/>
                                <Errors className="text-danger" model=".telnum" show="touched"
                                        messages={{
                                                requiredValidator: 'Required. ',
                                                minLenValidator: 'Must be at least 9 digits. ',
                                                maxLenValidator: 'Must be 15 digits or less. ',
                                                numberValidator: 'Must be digits. '
                                            }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                <Control.text model=".email" id="email" className="form-control" name="email" placeholder="Email"
                                              validators={{requiredValidator, emailValidator}}/>
                                <Errors className="text-danger" model=".email" show="touched"
                                        messages={{
                                                requiredValidator: 'Required. ',
                                                emailValidator: 'Invalid Email Address. '
                                            }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col mod={{size: 6, offset: 2}}>
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox model=".agree" className="form-check-input" name="agree" />
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </div>
                                </Col>
                                <Col mod={{size: 3, offset: 1}}>
                                <Control.select model=".contactType" className="form-control" name="contactType">
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                <Control.textarea model=".message" id="message" rows="12" className="form-control" name="message"
                                    validators={{requiredValidator}}/>
                                <Errors className="text-danger" model=".email" show="touched"
                                        messages={{
                                                requiredValidator: 'Required. '
                                            }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Send Feedback
                                </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
            );
    }
}

export default Contact;
