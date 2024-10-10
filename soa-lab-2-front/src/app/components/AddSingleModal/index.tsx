import {Modal} from "@/app/components/Modal";
import {useState} from "react";
import {Button} from "@/app/components/Button";
import {Single} from "@/app/types/single";
import {addSingle, changeSingle} from "@/app/queries/grammy";
import toast from 'react-hot-toast';

type AddSingleModalProps = {
    bandId: number;
    bandName: string;
    isVisible: boolean;
    onClose: () => void;
    currentValue?: Single;
}

export const AddSingleModal = ({ bandId, currentValue, bandName, isVisible, onClose }: AddSingleModalProps) => {
    // TODO: добавить onClick отправлю запроса на бекенд
    const [name, setName] = useState<string>(currentValue?.name ?? '');
    // TODO: добавить если есть уже значение - значит update

    function updateSingle() {
        if (currentValue?.id){
            changeSingle(bandId, currentValue?.id, { name })
                .then((data) => {
                    toast.success('Data successfully updated');
                })
            onClose();
        }
    }

    function createSingle() {
        addSingle(bandId, { name })
            .then((data) => {
                toast.success('Single successfully created');
            })
        onClose();
    }

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <div className='modal-container'>
                <h2>{currentValue ? `Update single for ${bandName}` : `New single for ${bandName}`}</h2>
                <label className='input-container'>
                    {currentValue ? 'New name' : 'Name'}
                    <input id='name' value={name} className='input' placeholder='e.g. Moonlight' onChange={(e) => setName(e.target.value)} />
                </label>
                <div className='buttons'>
                    <Button style='cancel' size='m' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button style='primary' size='m' onClick={currentValue ? updateSingle : createSingle}>
                        {currentValue ? 'Update' : 'Create'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}