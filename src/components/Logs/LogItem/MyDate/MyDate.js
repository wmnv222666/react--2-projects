import React, { useEffect, useState } from 'react';
import './MyDate.css';

const MyDate = (props) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        // Update formatted date when props.date changes
        const month = props.date.toLocaleString('zh-CN', { month: 'long' });
        console.log(month,'month')
        const date = props.date.getDate();
        console.log(date,"date")
        setFormattedDate(`${month} ${date}`);
    }, [props.date]);

    return (
        <div className="date">
            <div className="formatted-date">
                {formattedDate}
            </div>
        </div>
    );
};

export default MyDate;

