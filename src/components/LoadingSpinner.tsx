import { Container, Row, Col, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Container className="text-center py-5">
    <Row className="justify-content-center">
      <Col xs="auto">
        <Spinner animation="border" role="status" />
      </Col>
    </Row>
    <Row className="justify-content-center mt-3">
      <Col xs="auto">
        <p>Loading, please wait...</p>
      </Col>
    </Row>
  </Container>
);

export default LoadingSpinner;
