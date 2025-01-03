"use client"
import ButtonDelete from '../button-delete/buttonDelete';
import ButtonEdit from '../button-edit/buttonEdit';
import './card.css';

const Card = ({ photo, titleProduct, price, ingredients, productId , ordersDocumentId }) => {
    return (
        <div className="part">
            <img className='photo-part' src={photo} alt="photo" />
            <h1 className='title-part'>{titleProduct}</h1>
            <h2 className='price'>{price}</h2>
            <p className='ingredients'>{ingredients}</p>
            <div className='con-btn'>
                <ButtonEdit />
                <ButtonDelete productId={productId} ordersDocumentId={ ordersDocumentId} />
            </div>
        </div>
    );
}

export default Card;
