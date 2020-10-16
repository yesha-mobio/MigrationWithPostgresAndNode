import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
// import { graphql } from "react-apollo";

import Header from "../../components/Core/header";
// import { getBundleById } from "../../queries/bundle";

class SingleBundle extends Component {
  constructor(props) {
    super();
  }

  render() {
    const singleBundleForm = () => {
      return (
        <Container>
          <Row>
            <Col sm="12">
              <Card style={{ marginTop: "50px" }}>
                <CardHeader
                  style={{
                    textAlign: "center",
                    color: "#BC1A4B",
                    background: "#1ABC9C",
                  }}
                >
                  <h5>Single Bundle</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="bundleName">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="bundleName"
                        placeholder="Enter the name of the Bundle"
                        readOnly
                        //   value
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="bundleDescription">Description</Label>
                      <Input
                        type="text"
                        name="description"
                        id="bundleDescription"
                        placeholder="Enter the Description"
                        readOnly
                        //   value
                      />
                    </FormGroup>
                    <Button
                      onClick={() => this.props.history.push("/displayBundles")}
                      style={{
                        background: "#BC1A4B",
                        color: "#1ABC9C",
                        borderColor: "#BC1A4B",
                      }}
                    >
                      <b>List all Bundles</b>
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    };

    return (
      <div>
        <Header />
        {singleBundleForm()}
      </div>
    );
  }
}

export default withRouter(SingleBundle);
