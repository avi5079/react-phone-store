import React from 'react';
import Product from './Product';
import Title from './Title';
// import {storeProducts} from '../data';
import {ProductConsumer} from '../context';

function ProductList(){

    // const [products, setProducts] = useState(storeProducts);
    // console.log(products);
    
    return (
        <React.Fragment>
            <div className="py-5">
                <div className='container'>
                   <Title name="our" title="products" />
                   <div className="row">
                   <ProductConsumer>
                    {(value) => {
                        return value.products.map( product => {
                            return <Product product={product} key={product.id}/>;
                        })
                    }}
                   </ProductConsumer>
                   </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductList;