import { Col, Card, Button } from 'react-bootstrap';
import {numberWithCommas} from '../utils/utils'


const Menus = ({menu, addToCart}) => {
    return (
      <Col md={4} xs={12} className="mb-4">
        <Card className="shadow">
            <Card.Img variant="top" src={"assets/images" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
            <Card.Body>
                <Card.Title>{menu.nama}</Card.Title>
                <Card.Text>Kode : {menu.kode}</Card.Text>
                <Card.Text>
                  Harga :  Rp. {numberWithCommas(menu.harga)}
                </Card.Text>
                <Button variant="primary" onClick={() => addToCart(menu)} className="btn-sm"> Buy</Button>
            </Card.Body>
        </Card>
      </Col>
    )
}

export default Menus;