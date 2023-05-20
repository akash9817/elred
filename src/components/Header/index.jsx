import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import Navbar from "react-bootstrap/Navbar";
import { images } from "../../helpers/images";
import Image from "react-bootstrap/Image";
import style from "./style.module.scss";
import SearchBar from "components/Common/SearchBar";

function Header() {
  return (
    <Navbar bg="white" expand="lg" className={`px-5 pt-2 ${style.navbar}`}>
      <Container>
        <Row className="w-100">
          <Col md={3}>
            <Image src={images.logo} className={style.logo} alt="logo"/>
          </Col>
          <Col md={4}>
            {" "}
           <SearchBar/>
          </Col>
          <Col
            md={{ span: 4, offset: 4 }}
            className="d-flex ms-auto justify-content-end"
          >
            <Image rounded src={images.logo} className={`me-5 ${style.logo}`} alt="logo" />
            <div className="d-flex">
              <Image
                rounded
                src={images.user}
                className={`me-3 ${style.logo}`}
                alt="user"
              />
              <div>
                <h6 className="mb-0">User Admin</h6>
                <p className="mb-0">useradmin@elred.com</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
