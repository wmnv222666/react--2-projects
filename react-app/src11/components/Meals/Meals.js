import React from 'react';
import Meal from "./Meal/Meal";
import classes from './Meals.module.css';

/*
*   食物列表的组件
* */
const Meals = ({ meals }) => {
    return (
        /*现在将滚动条设置给了Meals*/
        <div className={classes.Meals}>
            {meals.map(item => <Meal
                key={item.id}
                item={item} />)}
            {/* 因为也可以title img等等一个一个的传 例如title={item.title} 没必要  然后在meal.js中传props*/}
        </div>
    );
};

export default Meals;
