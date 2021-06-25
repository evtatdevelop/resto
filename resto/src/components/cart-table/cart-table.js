import React from 'react';
import {connect} from 'react-redux';
import {delFromCart} from '../../actions';

import './cart-table.scss';

const CartTable = ({items, delFromCart}) => {
    return (
        <>
            <div className = "cart__title">Ваш заказ:</div>
            <div className = "cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, num, total} = item;
                        return (
                            <div key = {id} className = "cart__item">
                                <img src = {url} className = "cart__item-img" alt = {title}></img>
                                <div className = "cart__item-title">{title}</div>
                                <div className = "cart__item-price">{price}$ ({num} / {total}$)</div>
                                <div onClick = {() => {delFromCart(id)}} className = "cart__close">&times;</div>
                            </div>                           
                        )
                    })
                }

            </div>
        </>
    );
};

const mapStateToProps = ({items}) => {
    return {
        items,
    }
}

const mapDispatchToProps = {
    delFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);