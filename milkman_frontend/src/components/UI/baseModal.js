import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

const BaseModal = (props) => {
  const modalData = () => {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            <Card style={{ marginTop: "50px" }}>
              <CardHeader
                style={{
                  textAlign: "center",
                  color: "#BC1A4B",
                  background: "#1ABC9C",
                }}
              >
                <h5>{props.title}</h5>
              </CardHeader>
              <CardBody>
                <Button
                  color="success"
                  style={{
                    background: "#BC1A4B",
                    color: "#1ABC9C",
                    borderColor: "#BC1A4B",
                    width: "49%",
                  }}
                  onClick={props.addBundle}
                >
                  <b>{props.addButton} </b>
                </Button>
                &nbsp; &nbsp;
                <Button
                  color="success"
                  style={{
                    background: "#BC1A4B",
                    color: "#1ABC9C",
                    borderColor: "#BC1A4B",
                    width: "49%",
                  }}
                  onClick={props.displayBundles}
                >
                  <b>{props.displayButton} </b>
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <div>{modalData()}</div>;
};

export default BaseModal;
