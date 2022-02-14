import React from 'react';
import PropTypes from 'prop-types';

//화면에 보여져야 하는 값들 정리해서 넘겨주는 것

function Book({title, writer, bookMade, sellPrice, imageUri}){
    console.log(imageUri)
    return(
        <div classname="Book__data">
            <h1 classname="Book__title">{title}</h1>
            <h2 classname="Book__writer">{writer}</h2>
            <h3 classname="Book__made">{bookMade}</h3>
            <h4 classname="Book__Sell__price">{sellPrice}</h4>
            <img classname="Book__Image__uri" src={imageUri} alt='책이미지'/>
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