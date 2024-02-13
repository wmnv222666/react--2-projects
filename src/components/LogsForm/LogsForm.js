import React, {useState,useEffect} from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = (props) => {

    const [inputDate, setInputDate] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [inputTime, setInputTime] = useState('');

    //这一步 从APP父组件中得到可以修改的值和数据   比如数据获取、订阅、手动操作DOM等   取代了类式组件声明周期函数componentDidMount
    //   [props.editingLog] 是 useEffect 的依赖项数组，这表示当数组中的元素发生变化时，useEffect 就会执行。在这里，props.editingLog 是唯一的依赖项。
    useEffect(() => {
    // Update form fields when editingLog changes
        if (props.editingLog || props.viewingLog) {//如果开始编辑的话··也就是编辑的数据
            setInputDate((props.editingLog || props.viewingLog).date.toISOString().split('T')[0]);
            setInputDesc((props.editingLog || props.viewingLog).desc);
            setInputTime((props.editingLog || props.viewingLog).time.toString());
        }
    }, [props.editingLog,props.viewingLog]);//// 依赖数组...表示这个效果只在组件挂载和卸载时运行
    
    // 创建一个响应函数，监听日期的变化
    const dateChangeHandler = (e) => {
        setInputDate(e.target.value);
    };

    // 监听内容的变化
    const descChangeHandler = (e) => {

        setInputDesc(e.target.value);

    };

    //监听时长的变化
    const timeChangeHandler = (e) => {
        setInputTime(e.target.value);
    };

    // 当表单提交时，汇总表单中的数据
    const formSubmitHandler = (e) => {
    e.preventDefault();

    // 从表单字段中获取用户输入的值
    const editedLog = {
        date: new Date(inputDate), // 将 inputDate 解析为 Date 对象
        desc: inputDesc,
        time: +inputTime // 将 inputTime 转换为数字
    };
        
    

        // 如果存在正在编辑的日志项（editingLog 存在），表示用户正在编辑日志
        // 如果正在编辑，调用 onSaveEdit；否则，调用 onSaveLog
    // props.editingLog ? props.onSaveEdit(props.editingLog.id, editedLog.date, editedLog.desc, editedLog.time) : props.onSaveLog(editedLog);
    if (props.editingLog) {
        // 在保存编辑时，将正在编辑的日志项的 ID 一起传递
        props.onSaveEdit(props.editingLog.id, editedLog.date, editedLog.desc, editedLog.time);
    } else {
        // 如果不是在编辑状态，表示用户在添加新的日志
        props.onSaveLog(editedLog);
    }

    // 提交后重置表单字段
    setInputDate('');
    setInputDesc('');
    setInputTime('');
    };
    
    const closeHandler = () => {
        props.onCloseView();
 };
    
    return (
       <Card className="logs-form">
            <form onSubmit={formSubmitHandler}>
                <div className="form-item">
                    <label htmlFor="date">Date</label>
                    <input onChange={dateChangeHandler} value={inputDate} id="date" type="date" readOnly={props.editingLog || props.viewingLog ? true : false} />
                </div>
                <div className="form-item">
                    <label htmlFor="desc">Content</label>
                    <input onChange={descChangeHandler} value={inputDesc} id="desc" type="text" readOnly={props.editingLog || props.viewingLog ? true : false} />
                </div>
                <div className="form-item">
                    <label htmlFor="time">Time</label>
                    <input onChange={timeChangeHandler} value={inputTime} id="time" type="number" readOnly={props.editingLog || props.viewingLog ? true : false} />
                </div>
                <div className="form-btn">
                    {!props.viewingLog && <button>{props.editingLog ? 'Update' : 'Add'}</button>}
                    {props.viewingLog && <button type="button" onClick={closeHandler}>Close</button>}
                </div>
            </form>
        </Card>
    );
};

export default LogsForm;


// 首次渲染：

// App 组件渲染。
// isEditModalOpen 和 editingLog 初始为 false 和 null。
// 页面上可能不会显示 <LogsForm />，因为 isEditModalOpen 为 false。
// 用户点击“编辑”按钮：

// 触发 editlogByid 函数，该函数更新了 editingLog 的状态，将其设置为正在编辑的日志项的数据。
// isEditModalOpen 设置为 true，弹出编辑日志的模态框。
// 页面上显示 <LogsForm />，传递了 editingLog，触发了 useEffect。
// useEffect 执行：

// useEffect 根据 props.editingLog 更新了表单字段，将正在编辑的日志项的数据填充到表单中。
// 用户在表单中编辑：

// 用户在表单中输入编辑后的值。
// 用户点击“保存”按钮：

// 触发 formSubmitHandler 函数。
// 如果 props.editingLog 存在，说明用户正在编辑日志，则调用 props.onSaveEdit 传递编辑后的值和正在编辑的日志的 ID。
// 如果 props.editingLog 不存在，说明用户在添加新的日志，则调用 props.onSaveLog 传递新的日志项。
// App 组件接收保存的编辑：

// 如果是编辑状态，handleSaveEdit 函数在 App 组件中执行，更新了 logsData 中对应的日志项。
