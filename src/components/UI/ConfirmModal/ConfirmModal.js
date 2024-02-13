import './ComfirmModal.css';
import Card from "../Card/Card";
import BackDrop from "../BackDrop/BackDrop";

const ConfirmModal = props => {

    return <BackDrop>
        <Card className="confirmModal">
            <div className="confirmText">
                <p>{props.confirmText}</p>
            </div>
            <div className="confirmButton">
                <button onClick={props.onOk} className="okButton">Confirm</button>
                <button onClick={props.onCancel}>Cancel</button>
            </div>
        </Card>;
    </BackDrop>

};

export default ConfirmModal;
