import React from "react";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import { Row, Col } from "react-bootstrap";
import ProductMenu from "components/ProductMenu";
import SubMenu from "components/SubMenu";
import { getCategory } from "redux/actions/categoryAction";
import { useSelector } from "react-redux";
import CartMenu from "components/CartMenu";
import { NotificationContainer } from "react-notifications";

function Home() {
  const categories = useSelector((state) => state.handleCategory);
  return (
    <Row className="py-4">
      <Col md={8}>
        <Row className="flex-nowrap">
          <Col md={3} style={{ minWidth: "250px", maxWidth: "250px" }}>
            <SideMenu />
          </Col>
          <Col md={9} style={{ flexGrow: 1 }}>
            <ProductMenu />
          </Col>
        </Row>

        <section>
          <SubMenu data={categories} />
        </section>
      </Col>
      <Col md={4}>
        <CartMenu />
      </Col>
      <NotificationContainer/>
    </Row>
  );
}

export default Home;
