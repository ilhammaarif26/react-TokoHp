import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {Hasil, ListCategories, Menus} from '../components';
import {API_URL} from '../utils/constant';
import axios from 'axios';
import swal from 'sweetalert';


class Home extends Component {
  constructor(props) {
    super(props)
      this.state = {
        menus : [],
        chooseCategory : "Handphone",
        keranjangs : []  
      }
    }

    componentDidMount(){
      axios
        .get(API_URL + "products?category.nama=" + this.state.chooseCategory)
        .then(res => {
          const menus = res.data;
          this.setState({menus})
        })
        .catch(error => {
          console.log(error)
        })

      axios 
      .get(API_URL + "keranjangs" )
      .then(res => {
        const keranjangs = res.data;
        this.setState({keranjangs})
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidUpdate(prevState){
    if(this.state.keranjangs !== prevState.keranjangs){
      axios 
      .get(API_URL + "keranjangs" )
      .then(res => {
        const keranjangs = res.data;
        this.setState({keranjangs})
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  changeCategory = (value) => {
    this.setState({
      chooseCategory : value,
      menus : []
    })
    axios
        .get(API_URL + "products?category.nama=" + value)
        .then(res => {
          const menus = res.data;
          this.setState({menus})
        })
        .catch(error => {
          console.log("Error ya", error)
        })
  }

  addToCart = (value) => {
    axios
        .get(API_URL + "keranjangs?product.id=" + value.id)
        .then((res) => {
          if(res.data.length === 0){
            const keranjang = {
              jumlah : 1,
              total_harga: value.harga,
              product : value
            };
            axios
                .post(API_URL + "keranjangs", keranjang)
                .then((res) => {
                  swal({
                    title: "Terimakasih",
                    text: keranjang.product.nama + " Kamu sudah masuk keranjang " ,
                    icon: "success",
                    button: false,
                    timer: 2000
                  });
                })
                .catch((error) => {
                  console.log("Error ya", error) 
                });        
          }else {
            const keranjang = {
              jumlah : res.data[0].jumlah+1,
              total_harga: res.data[0].total_harga+value.harga,
              product : value
            }
            axios
                .put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
                .then((res) => {
                  swal({
                    title: "Terimakasih",
                    text: keranjang.product.nama + " Kamu sudah masuk keranjang",
                    icon: "success",
                    button: false,
                    timer: 2000
                  });
                })
                .catch((error) => {
                  console.log("Error ya", error)
                })   
          }
        })
        .catch((error) => {
          console.log("Error ya", error)
        })
    
  }
  
  render() {
    const {menus, chooseCategory, keranjangs} = this.state
    return (
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} chooseCategory={chooseCategory}/>
            <Col>
              <h4 className="text-center"><strong>Daftar Produk</strong></h4>
              <hr></hr>
              <Row className="py-4">
                {menus && menus.map((menu) => (
                  <Menus 
                    key={menu.id}
                    menu={menu}
                    addToCart={this.addToCart}
                  />

                ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs}/>
          </Row>
        </Container>
      </div>
    );
  }
}


export default Home ;
