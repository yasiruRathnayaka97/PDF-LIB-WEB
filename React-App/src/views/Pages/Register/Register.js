import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
const config=require('dotenv').config();

const base=process.env.REACT_APP_REST_API_BASE;
class Register extends Component {

  constructor(props){
   
    super(props);
    this.state={
      userName:"",
      password:"",
      repeatPassword:"",
      email:""
    }
    
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleUserNameChange=this.handleUserNameChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange=this.handleRepeatPasswordChange.bind(this);
  }
  
  async handleSubmit(event) {
    
    event.preventDefault();
     if(this.state.password==this.state.repeatPassword){
     await fetch(base+'/account/signup', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "userName": this.state.userName,
         "password": this.state.password,
         "email":this.state.email
        })
       });
     }
    
    }
  
  handleUserNameChange(event){
    event.preventDefault();
    this.setState({userName:event.target.value})
  }
  handlePasswordChange(event){
    event.preventDefault();
    this.setState({password:event.target.value})
  }
  handleRepeatPasswordChange(event){
    event.preventDefault();
    this.setState({repeatPassword:event.target.value})
  }
  handleEmailChange(event){
    event.preventDefault();
    this.setState({email:event.target.value})
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required='required' value={this.state.userName} onChange={this.handleUserNameChange} type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input required='required' value={this.state.email} onChange={this.handleEmailChange} type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required='required' value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required='required' value={this.state.repeatPassword} onChange={this.handleRepeatPasswordChange} type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button type='submit' color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4"> */}
                  {/* <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row> */}
                {/* </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
