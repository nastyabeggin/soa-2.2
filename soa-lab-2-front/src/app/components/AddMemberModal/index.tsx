import {Button} from "@/app/components/Button";
import {Modal} from "@/app/components/Modal";
import {useState} from "react";

type AppMemberModalProps = {
    bandId: number;
    bandName: string;
    isVisible: boolean;
    onClose: () => void
}

export const AddMemberModal = ({ bandId, bandName, isVisible, onClose }: AppMemberModalProps) => {
    const [name, setName] = useState<string | undefined>(undefined);
    const [birthday, setBirthday] = useState<string | undefined>(undefined);
    const [passport, setPassport] = useState<number>();
    const [x, setX] = useState<number>();
    const [y, setY] = useState<number>();
    const [z, setZ] = useState<number>();
    const [locationName, setLocationName] = useState<string>();

    // TODO: добавить отправку формы добавления участника группы
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <div className='modal-container'>
                <h2>Add new member to {bandName}</h2>
                <label className='input-container'>
                    Name
                    <input id='name' value={name} className='input' placeholder='e.g. Daniel Moon'
                           onChange={(e) => setName(e.target.value)}/>
                </label>
                <label className='input-container'>
                    Birthday
                    <input type='date' id='birthday' value={birthday} className='input'
                           onChange={(e) => setBirthday(e.target.value)}/>
                </label>
                <label className='input-container'>
                    Passport ID*
                    <input type='number' id='passport-id' value={passport} className='input'
                           placeholder='e.g. 623532526' required
                           onChange={(e) => setPassport(Number(e.target.value))}/>
                </label>
                <h3>Location</h3>
                <label className='input-container'>
                    Location title
                    <input id='location-name' value={locationName} className='input'
                           placeholder='e.g. Toronto'
                           onChange={(e) => setLocationName(e.target.value)}/>
                </label>
                <label className='input-container'>
                    Coordinate X*
                    <input type='number' id='x' value={x} className='input'
                           placeholder='e.g. 34' required
                           onChange={(e) => setX(Number(e.target.value))}/>
                </label>
                <label className='input-container'>
                    Coordinate Y*
                    <input type='number' id='y' value={y} className='input'
                           placeholder='e.g. 743' required
                           onChange={(e) => setY(Number(e.target.value))}/>
                </label>
                <label className='input-container'>
                    Coordinate Z*
                    <input type='number' id='z' value={z} className='input'
                           placeholder='e.g. 0' required
                           onChange={(e) => setZ(Number(e.target.value))}/>
                </label>
                <div className='buttons'>
                    <Button style='cancel' size='m' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button style='primary' size='m'>
                        Create
                    </Button>
                </div>
            </div>
        </Modal>
    )
}