import React from 'react';
import PropTypes from 'prop-types';

//화면에 보여져야 하는 값들 정리해서 넘겨주는 것

function Book({Title, Writer, Book_made, Sell_price, Image_uri}){
    return(
        <div class="Book__data">
            <h3 class="Book__title">{Title}</h3>
            <h5 class="Book__writer">{Writer}</h5>
            <h7 class="Book__made">{Book_made}</h7>
            <h9 class="Book__Sell__price">{Sell_price}</h9>
            <h11 class="Book__Image__uri">{Image_uri}</h11>
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