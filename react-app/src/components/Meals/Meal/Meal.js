import React from 'react';
import classes from "./Meal.module.css";
import Counter from "../../UI/Counter/Counter";

/*
*   食物组件
* */
// 其实是可以const Meal = ({ props }) => {但是也可以直接传item  从父组件中传过来的
{/* <img src={props.item.img} />但是可以按照下面的写·简单一些 */}
const Meal = ({ item, noDesc }) => {
    let { desc, price, img, title, amount } = { ...item }
    return (
        <div className={classes.Meal}>
            <div className={classes.ImgBox}>
                <img src={img} />
            </div>
            <div className={classes.info}>
                <h2 className={classes.Title}>{title}</h2>
                {noDesc ? null : <p className={classes.Desc}>{desc}</p>}

                <div className={classes.PriceWrap}>
                    <span className={classes.Price}>{price}</span>
                    <Counter amount={amount}
                        item={item} />
                </div>
            </div>
        </div>
    );
};

export default Meal;
