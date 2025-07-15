import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Container,Row,Col, Button } from 'react-bootstrap'
import { CurrencyRupee} from 'react-bootstrap-icons'
import "../style.css"
import { useDispatch,useSelector } from 'react-redux'
import { add } from './Actions'


const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log('Error fetching products:', err));
  }, []);

  const addCart = (product) => {
    dispatch(add(product));
  };

  return (
    <Container>
      <Row>
        {products.map((product, index) => (
          <Col xs={12} sm={6} md={4} key={index}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text><CurrencyRupee />{product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Card.Link style={{ textDecoration: 'none' }}>
                  <Button onClick={() => addCart(product)}>Add To Cart</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;