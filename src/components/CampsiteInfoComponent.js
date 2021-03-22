import React from 'react'
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label,} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


    class CommentForm extends React.Component {
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
            console.log("Current state is: " + JSON.stringify(values));
            alert("Current state is: " + JSON.stringify(values));
        }

        render() {
            return (
                <React.Fragment>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
              <LocalForm onSubmit={values => this.handleSubmit(values)}>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" id="rating" className="form-control">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                  </Control.select>
                  <Label htmlFor="author">Author</Label>
                  <Control.text model=".author" id="author" className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                                        }}>
​
                      
                  </Control.text>
                  <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        component="div"
                        messages={{
                        required: 'Required',
                        minLength: 'Must be at least 2 characters',
                        maxLength: 'Must be 15 characters or less'
                        }}/>
​
                  <Label htmlFor="text">Text</Label>
                  <Control.textarea model=".text" id="text" className="form-control">
​
                  </Control.textarea>
                  <Button type="submit">
                      Submit
                  </Button>
              </LocalForm>
          </ModalBody>
          </Modal>
                <Button onClick={this.toggleModal}type="submit" outline>
                    <i className="fa fa-pencil fa-lg"/>
                    Submit Comment
                </Button>
                </React.Fragment>
                
            )
        }
    }



    function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card onClick={()=> this.onCampsiteSelect(campsite)}>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );

    }

    function RenderComments({comments}) {
        if (comments) {
            console.log(comments)
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return(
                            <div>
                                <p>{comment.text}</p>
                                <p> --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                
                            </div>
                            
                        )
                    })}
                    <CommentForm />
                </div>
            )
        }
    }
    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
​
                    <div className= "row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                
            )
        }

        return (
            <div>
            </div>
        );
    }
 export default CampsiteInfo;




