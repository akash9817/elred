import React from "react"
import {Form, InputGroup} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import style from "./style.module.scss";
import { icons } from "../../../helpers/images";

function SearchBar(){
return (
    <Form className={style.searchBar}> 
       <Image
         rounded
         src={icons.search}
         className={`me-3 ${style.searchIcon}`}
       />
     <Form.Control
       type="search"
       placeholder="Search"
       className={`${style.searchInput}`}
       aria-label="Search"
     />
 </Form>
)

}

export default SearchBar