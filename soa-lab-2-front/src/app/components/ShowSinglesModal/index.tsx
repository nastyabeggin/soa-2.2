import {Modal} from "@/app/components/Modal";
import {Button} from "@/app/components/Button";
import {useState} from "react";
import {Single} from "@/app/types/single";
import styles from './styles.module.css';
import {EditIcon} from "@/static/icons";
import {AddSingleModal} from "@/app/components/AddSingleModal";
import {Band} from "@/app/types/bands";

type AddSingleModalProps = {
    band: Band;
    isVisible: boolean;
    onClose: () => void;
}

export const ShowSinglesModal = ({ band, isVisible, onClose }: AddSingleModalProps) => {
    const [isUpdateSingleModalVisible, setUpdateSingleModalVisible] = useState<boolean>(false);
    const [currentUpdateSingle, setCurrentUpdateSingle] = useState<Single>();

    return (
        <>
            <Modal isVisible={isVisible} onClose={onClose}>
                <div className='modal-container'>
                    <h2>{band.name} singles</h2>
                    <ul className={styles.list}>
                        {band.singles?.map((single) => {
                            return (
                                <li key={single.id}>
                                    <div className={styles.singleContainer}>
                                        <span># {single.id}</span>
                                        <span>{single.name}</span>
                                        <EditIcon className={styles.icon} onClick={() => {
                                            setCurrentUpdateSingle(single);
                                            setUpdateSingleModalVisible(true);
                                        }}/>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                    <div className='buttons' onClick={onClose}>
                        <Button style='primary' size='m'>
                            Ok
                        </Button>
                    </div>
                </div>
            </Modal>
            {isUpdateSingleModalVisible &&
                <AddSingleModal bandId={band.id} bandName={band.name} currentValue={currentUpdateSingle} isVisible={isUpdateSingleModalVisible} onClose={() => {
                    setUpdateSingleModalVisible(false);
                    onClose();
                }}/>
            }
        </>
    )
}