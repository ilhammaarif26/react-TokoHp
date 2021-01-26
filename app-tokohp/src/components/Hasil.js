import React, { Component } from 'react';
import { Badge, Col, ListGroup, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

class Hasil extends Component {
    render() {
        const {keranjangs} = this.props;
        return (
            <Col md={3} mt="2">
                <h4 className="text-center"><strong>Hasil</strong></h4>
                <hr/>
                {keranjangs.length !== 0 && 
                    <ListGroup variant="flush">
                        
                        {keranjangs.map((daftarKeranjang) => 
                        
                        <ListGroup.Item>
                        <Row>
                            <Col xs={2}>
                                <p>
                                    <Badge pill variant="success">  
                                        {daftarKeranjang.jumlah}
                                    </Badge>
                                </p> 
                            </Col>
                            <Col>
                                <h5>{daftarKeranjang.product.nama}</h5>
                                <p>Rp. {numberWithCommas(daftarKeranjang.product.harga)}</p>
                            </Col>
                            <Col>
                                <p><strong className="float-right">Rp. {numberWithCommas(daftarKeranjang.total_harga)}</strong></p>
                            </Col>
                        </Row>
                        </ListGroup.Item>)}
                        
                    </ListGroup>
                }
            </Col>
        );
    }
}

export default Hasil;