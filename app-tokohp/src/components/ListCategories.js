import React, {Component} from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from "axios";
import {API_URL} from '../utils/constant';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMobile, faTablet, faHeadphones} from '@fortawesome/free-solid-svg-icons';

const Icon = ({nama}) => {
    if(nama === "Handphone") return  <FontAwesomeIcon icon={faMobile} className="mr-2" />
    if(nama === "Tablet") return  <FontAwesomeIcon icon={faTablet} className="mr-2" />
    if(nama === "Accessories") return  <FontAwesomeIcon icon={faHeadphones} className="mr-2" />

    return <FontAwesomeIcon icon={faMobile} className="mr-2" />
}

export default class ListCategories extends Component{ 
    constructor(props) {
        super(props)
        this.state = {
             categories : []
        }
    }
    
    componentDidMount(){
        axios
          .get(API_URL + "categories")
          .then(res => {
            const categories = res.data;
            this.setState({categories});
          })
          .catch(error => {
            console.log("error", error) ;
          })
    }

    render(){
        const {categories} = this.state;
        const {changeCategory, chooseCategory} = this.props;
        return(
            <Col md={2} mt="2" >
                <h4 className="text-center"><strong>Daftar Kategori</strong></h4>
                <hr/>
                <ListGroup>
                    {categories && categories.map((category) => (
                    <ListGroup.Item 
                        key={category.id} 
                        onClick={() => changeCategory(category.nama)}
                        className={chooseCategory === category.nama && "category-active"}
                        style={{cursor : 'pointer'}} >
                        <Icon nama={category.nama} /> {category.nama}
                    </ListGroup.Item>))}
                </ListGroup>
            </Col>
        )
    }
}