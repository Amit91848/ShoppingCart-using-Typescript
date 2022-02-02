import { Button } from '@material-ui/core';

import { CardItemType } from '../App';

import { Wrapper } from './Item.styles';

type Props = {
    item: CardItemType
    handleAddToCart: (clickedItem: CardItemType) => null,

}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
    return (
        <Wrapper>  
            <img src={item.image} alt={item.title} />
            <div>
                <h3>{item.title}</h3>
                <p> {item.description} </p>
                <h3> ${item.amount} </h3>
            </div>
            <Button onClick={() => handleAddToCart(item)} >Add To Cart</Button>
        </Wrapper>
    );
}

export default Item;