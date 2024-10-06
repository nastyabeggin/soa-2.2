import {Button} from "@/app/components/Button";
import {Modal} from "@/app/components/Modal";
import styles from './styles.module.css';

type DeleteBandModalProps = {
    bandId: number;
    bandName: string;
    isVisible: boolean;
    onClose: () => void;
}

export const DeleteBandModal = ({ bandName, isVisible, onClose }: DeleteBandModalProps) => {
    // TODO: добавить onClick удаление группы

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <div className='modal-container'>
                <h2>Do you want to delete {bandName}?</h2>
                <span className={styles.caption}>This action cannot be undone. Think wisely</span>
                <div className='buttons'>
                    <Button style='cancel' size='m' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button style='danger' size='m'>
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    )
}