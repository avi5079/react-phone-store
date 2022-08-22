import React, {useState, useEffect} from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import { storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();


function ProductProvider(props){

    const[data, setData] = useState({products: [], detailProduct: detailProduct, cart: [], modalOpen: false,modalProduct: detailProduct, cartSubTotal: 0, cartTax: 0, cartTotal: 0});

    function getItem(id){
        const product = data.products.find(item => item.id === id);
        return product;
    }

    function handleDetail(id) {
        // console.log('Hello from detail');
        const product = getItem(id);
        setData((prevValue) => ({...prevValue, detailProduct: product}));

    }

    function addToCart(id) {
        let tempProducts = [...(data.products)]
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        setData((prevValue) => {return {...prevValue, products: tempProducts, cart:[...(prevValue.cart), product]}});
    }

    function openModal(id) {
        const product = getItem(id);
        setData((prevValue) => {
            return {...prevValue, modalProduct: product, modalOpen: true}
        })
    }

    function closeModal() {
        setData((prevValue) => {
            return {...prevValue, modalOpen: false}
        })
    }

    function increment(id) {
        let tempCart = [...data.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;

        setData((prevValue) => ({...prevValue, cart: [...tempCart]}));
        addTotals();
    }

    function decrement(id) {
        let tempCart = [...data.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if(product.count === 0){
            removeItem(id);
        } else {
            product.total = product.count * product.price;
            setData((prevValue) => ({...prevValue, cart: [...tempCart]}));
        }
    }

    function removeItem(id) {
        let tempProducts = [...data.products];
        let tempCart = [...data.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        setData((prevValue) => ({...prevValue, cart: [...tempCart], products:[...tempProducts]}))
    }

    function clearCart() {
        setData((prevValue) => { return {...prevValue, cart: []}})
        setProducts();
    }

    function addTotals() {
        let subTotal = 0;
        data.cart.map(item => (subTotal += item.total))
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        setData((prevValue) => ({...prevValue, cartSubTotal: subTotal, cartTax: tax, cartTotal: total}));
    }

    useEffect(addTotals, [data.cart]);

    function setProducts() {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        setData((prevValue) => { return {...prevValue, products:tempProducts,detailProduct: detailProduct} })
    }

    useEffect(setProducts,[]);

    return (<ProductContext.Provider value={{...data, handleDetail: handleDetail, addToCart: addToCart, openModal: openModal, closeModal: closeModal, increment: increment, decrement: decrement, removeItem: removeItem, clearCart: clearCart}}>
    {props.children}
    </ProductContext.Provider>);
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};

// export default ProductProvider;