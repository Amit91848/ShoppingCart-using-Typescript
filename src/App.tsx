import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { Drawer,
  LinearProgress,
  Grid,
  Badge
 } from '@material-ui/core';

import {
  AddShoppingCart,

} from '@material-ui/icons'
import { Wrapper, StyledButton } from './App.styles';

import Item from './Item/Item';

import './App.css';

export type CardItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number
}

const getProducts = async(): Promise<CardItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json()
}

function App() {
  const [ cartOpen, setCartOpen ] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CardItemType[]>([]);

  const { data, isLoading, error } = useQuery<CardItemType[]>('products', getProducts);

  const getTotalItems = (items: CardItemType[]) => items.reduce((ack: number, item) => ack + item.price, 0);

  const handleAddToCart = (clickedItem: CardItemType) => null;

  const handleRemoveFromCart = () => null;

  if(isLoading) {
    return <LinearProgress/>;
  }

  if(error) {
    return <div>Something went wrong....</div>;
  }
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={ () => setCartOpen(false) } > 
        Cart goes here
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error' />
      </StyledButton>
      <Grid container spacing={3}>
        {
          data?.map(item => (
            <Grid item xs={12} sm={4} key={item.id}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
