import React from 'react';
import PropTypes from 'prop-types';

//화면에 보여져야 하는 값들 정리해서 넘겨주는 것

function Book({title, writer, bookMade, sellPrice, imageUri}){
    console.log(imageUri)
    return(
        <div class="Book__data">
            <h3 class="Book__title">{title}</h3>
            <h5 class="Book__writer">{writer}</h5>
            <h7 class="Book__made">{bookMade}</h7>
            <h9 class="Book__Sell__price">{sellPrice}</h9>
            <img class="Book__Image__uri" src={imageUri} alt='책이미지'/>
        </div>
    );
}
Book.propTypes ={
    Title:PropTypes.string.isRequired,
    Writer:PropTypes.string.isRequired,
    Book_made:PropTypes.string.isRequired,
    Sell_price:PropTypes.string.isRequired,
    Image_uri:PropTypes.string.isRequired,
};

export default Book;