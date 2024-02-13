import Logs from "./components/Logs/Logs";
import LogsForm from "./components/LogsForm/LogsForm";
import './App.css';
import { useState } from "react";

const App = () => {

    // 数据
    const [logsData, setLogsData] = useState([
        {
            id: '001',
            date: new Date(2021, 1, 20, 18, 30),
            desc: 'Javascript',
            time: 30
        },
        {
            id: '002',
            date: new Date(2022, 2, 10, 12, 30),
            desc: 'Java',
            time: 20
        },
        {
            id: '003',
            date: new Date(2022, 2, 11, 11, 30),
            desc: 'PHP',
            time: 40
        },
        {
            id: '004',
            date: new Date(2022, 2, 15, 10, 30),
            desc: 'React',
            time: 80
        },
        {
            id: '001',
            date: new Date(2020, 1, 20, 18, 30),
            desc: 'Typescript',
            time: 30
        },
    ]);


    //为了写编辑的按钮 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    //它将保存正在编辑的当前日志对象。在初始状态下，它被设置为空，因为最初没有编辑日志。
    const [editingLog, setEditingLog] = useState(null);
     const [viewingLog, setViewingLog] = useState(null);
    /*
    *   下一步：
    *     将LogsForm中的数据传递给App组件，然后App组件，将新的日志添加到数组中！
    * */

    // 定义一个函数
    const saveLogHandler = (newLog) => {
        // 向新的日志中添加id
        newLog.id = Date.now() + '';

        // console.log('App.js -->',newLog);

        // 将新的数据添加到数组中
        // logsData.push(newLog);
        setLogsData([newLog, ...logsData]);

    };

   
          const viewLogHandler = () => {
        setIsEditModalOpen(false); // 关闭编辑模式
        setViewingLog(null); // 重置查看的日志对象为 null
    }
        


    // 定义一个函数，从数据中删除一条日志
    // 根据索引删除可能会出问题
    /* const delLogByIndex = (index) => {
        setLogsData(prevState => {
            const newLog = [...prevState];
            newLog.splice(index, 1);
            return newLog;
        });
    }; */

    // 根据id删除
    const delLogById = (id) => {
        // 1. js删除方法是
            // setLogsData.slice(index,1)
        
        // 2.复制之前的所有的数据然后从数据中按照index删除一条，然后slice删除方式 
        // 如果采用这两种还得传index在let logItemData = filterData.map((item，index) 
        // a中，setLogsData(prevState => { [...prevState].splice(index, 1) }
            //b中 setLogsData(prevState => {
        //     const newLog = [...prevState]
        //     newLog.splice(index, 1)
        //     return newLog
        // });

        setLogsData(prevState => prevState.filter(i => i.id !== id));
    };
    
    //只是找到需要编辑的ID项
    const editlogByid = (id) => {
        const logToEdit = logsData.find(item => item.id === id);
        setEditingLog(logToEdit);
        setIsEditModalOpen(true);
    }

    const viewlogByid = (id) => {
        const logToView = logsData.find(item => item.id === id);
        setViewingLog(logToView);
        setIsEditModalOpen(true);
    }

      const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingLog(null);
      };
    
    
    //完全可以拿到修改的值和修改的数组 并且把修改的值 也就是新的值·进行保存 而进行值的修改在 logsForm 中
    const handleSaveEdit = (id, editedDate, desc, time) => {
        //   console.log(id, editedDate, desc, time)
        // Implement the logic to save the edited data
        // For example, update the logsData array with the edited data
        const updatedLogs = logsData.map(item => (item.id === id ? { ...item,date: editedDate, desc, time } : item));
        // console.log(updatedLogs,"updatedLogs")
        setLogsData(updatedLogs);//get new edit data

        // // Close the modal
        closeEditModal();
    };


// editingLog={editingLog}需要传到弹出窗口时表单用正在编辑的日志数据预先填充字段。
    return <div className="app">
        {/*引入LogsFrom*/}
        <LogsForm onSaveLog={saveLogHandler} onCloseView={viewLogHandler} />
        <Logs logsData={logsData} onDelLog={delLogById} onEditlog={editlogByid} onViewlog={viewlogByid} />
        
        {isEditModalOpen && (editingLog || viewingLog) && (
             <LogsForm editingLog={editingLog} viewingLog={viewingLog} onSaveEdit={handleSaveEdit} />
         )}
    </div>;
};

// 导出App
export default App;
//删除时 APP 爷爷组件  logs 父亲组件   logitem 孙子组件··所以把ID传过去


// onSaveEdit={handleSaveEdit}:该道具将handleSaveEdit函数传递给LogsForm组件。这是一个回调函数，当用户在编辑日志后单击“保存”按钮时，将在LogsForm组件中调用该函数。
// 它获取编辑过的值(id、editedDate、desc、time)，并更新App组件中的logsData数组


// 在编辑日志的流程中，用户点击“编辑”按钮会触发更新 editingLog，然后将 editingLog 的值传递给 LogsForm 组件，以便在表单中填充编辑前的值。当用户完成编辑并点击“保存”按钮时，handleSaveEdit 函数被调用，它使用编辑后的值更新相应的日志项，
// 并完成保存操作。这两者协同工作，使得编辑日志的功能得以实现。