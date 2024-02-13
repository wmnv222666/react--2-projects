import React, { useState, useReducer } from 'react';
import Meals from "./components/Meals/Meals";
import CartContext from './store/cartContext';
import Filter from './components/Filter/Filter';
import Cart from './components/Cart/Cart';


// 商品数据
const MEALS_DATA = [
    {
        id: '1',
        title: 'Hamburger',
        desc: 'You can not resist the classic taste of 100% pure beef paired with crunchy pickled melon and onion cubes and delicious tomato sauce!',
        price: 12,
        img: '/img/meals/1.png'
    },
    {
        id: '2',
        title: 'Double Cheeseburger ',
        desc: '100% pure beef and double cheese, with soft bread and delicious sauce ',
        price: 20,
        img: '/img/meals/2.png'
    },
    {
        id: '3',
        title: 'Big MAC ',
        desc: 'Two pieces of 100% pure beef, with lettuce, Onions and other fresh ingredients, rich taste, extremely delicious!',
        price: 24,
        img: '/img/meals/3.png'
    }, {
        id: '4',
        title: 'McSpicy Chicken Leg Burger ',
        desc: 'Golden crispy spicy skin, fresh and smooth chicken thigh meat, multiple flavors, once impress your picky taste buds! ',
        price: 21,
        img: '/img/meals/4.png'
    }, {
        id: '5',
        title: 'Grilled Chicken Burger ',
        desc: 'The original boneless chicken chop is tender and juicy, with green fresh lettuce and fragrant roast chicken sauce. ',
        price: 22,
        img: '/img/meals/5.png'
    }, {
        id: '6',
        title: 'McChicken ',
        desc: 'Crisp and refreshing lettuce, golden crispy chicken. Nutrition match, good taste of healthy choice! ',
        price: 14,
        img: '/img/meals/6.png'
    }, {
        id: '7',
        title: 'Cheeseburger ',
        desc: '100% pure beef and soft cheese blend with a delicious tomato sauce rich taste immediately emerge! ',
        price: 12,
        img: '/img/meals/7.png'
    }
];
// cartReducer 聚合函数
const cartReducer = (state, action) => {

    const newCart = { ...state }
    switch (action.type) {
        case 'ADD':
            // 购物车判断是否存在该商品
            if (newCart.items.indexOf(action.meal) === -1) {
                // 不存在
                newCart.items.push(action.meal)
                action.meal.amount = 1

            } else {
                // 存在
                action.meal.amount += 1

            }
            newCart.totalAmount += 1
            newCart.totalPrice += action.meal.price
            // 重设购物车数据
            return newCart

        case 'DELETE':
            // 购物车判断是否存在该商品
            // 不为1
            action.meal.amount -= 1
            if (action.meal.amount === 0) {
                // 余数为1 直接删除
                newCart.items = newCart.items.filter(i => i !== action.meal)
            }
            newCart.totalAmount -= 1
            newCart.totalPrice -= action.meal.price
            // 重设购物车数据
            return newCart

        case 'CLEAR':
            // 将购物车中商品的数量清0
            newCart.items.forEach(item => delete item.amount);
            newCart.items = [];
            newCart.totalAmount = 0;
            newCart.totalPrice = 0;
            return newCart

        default:
            return state
    }
}


const App = () => {
    // 购物车中的商品数据 用state管理
    /* 
    meal.amount 单个商品数量
    1. items 列表
    2. totalAmount 总数
    3. totalPrice 总价
    
    */
    /* const [cartData, setCartData] = useState({
        items: [],//就是商品
        totalAmount: 0,
        totalPrice: 0
    }) */

    // 过滤函数
    const filterHandler = (keyword) => {
        const newArr = MEALS_DATA.filter(i => i.title.indexOf(keyword) !== -1)
        setMealData(newArr)
    }

    // 用reducer管理购物车数据，函数
    const [cartData, cartDispatch] = useReducer(cartReducer, {
        items: [],
        totalAmount: 0,
        totalPrice: 0
    })

    // 添加购物商品函数    ！newCart 就是上面购物车的数据 包括（item 数量和总价  ）meal是需要添加的商品
    /*     const addMealHandler = (meal) => {
            const newCart = { ...cartData }
            // 购物车判断是否存在该商品  等于-1就是没有找到  或者includes替代f (!newCart.items.includes(meal))
            if (newCart.items.indexOf(meal) === -1) {
                // 不存在
                newCart.items.push(meal)//等同于newCart.items = [...newCart.items, meal];
//相当于第一次添加商品的时候·我们把数量设置成1
                meal.amount = 1
    
            } else {
                // 存在
                meal.amount += 1
    
            }
            newCart.totalAmount += 1
            newCart.totalPrice += meal.price
            // 重设购物车数据
            setCartData(newCart)
            console.log(cartData, '!');
    
        } */

    // 删除购物车商品函数
    /*  const deleMealHandler = (meal) => {
         const newCart = { ...cartData }
         // 不为1
         meal.amount -= 1
         if (meal.amount === 0) {
             // 余数为1 直接删除
             newCart.items = newCart.items.filter(i => i !== meal)
             // newCart.items.splice(newCart.items.indexOf(meal), 1);//indexOf(meal)拿到meal索引
         }
         newCart.totalAmount -= 1
         newCart.totalPrice -= meal.price
 
         // 重设购物车数据
         setCartData(newCart)
     } */

    // 清空购物车函数
    /*  const clearCart = (params) => {
 
         const newCart = { ...cartData };
         // 将购物车中商品的数量清0
         newCart.items.forEach(item => delete item.amount);
         newCart.items = [];
         newCart.totalAmount = 0;
         newCart.totalPrice = 0;
 
         setCartData(newCart);
     } */



    const [mealData, setMealData] = useState(MEALS_DATA)



    return (
        <div>
            <Filter filterHandler={filterHandler} />
            <CartContext.Provider value={{ ...cartData, cartDispatch }}>
                <Meals meals={mealData} />
                <Cart />
            </CartContext.Provider>
        </div>
    );
};

export default App;
