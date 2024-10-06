import {Button} from "@/app/components/Button";
import {Modal} from "@/app/components/Modal";
import {useState} from "react";
import {Band} from "@/app/types/bands";
import {Genre, GENRES} from "@/app/types/genre";
import styles from './styles.module.css';
import {Single} from "@/app/types/single";

type AddBandModalProps = {
    band?: Band;
    isVisible: boolean;
    onClose: () => void;
}

export const AddBandModal = ({ band, isVisible, onClose }: AddBandModalProps) => {
    const [name, setName] = useState<string | undefined>(band?.name ?? undefined);
    const [description, setDescription] = useState<string | undefined>(band?.description ?? undefined);
    const [x, setX] = useState<number | undefined>(band?.coordinates.x ?? undefined);
    const [y, setY] = useState<number | undefined>(band?.coordinates.y ?? undefined);
    const [creationDate, setCreationDate] = useState<string | undefined>(band?.creationDate ?? undefined);
    const [numberOfParticipants, setNumberOfParticipants] = useState<number | undefined>(band?.numberOfParticipants ?? undefined);
    const [genre, setGenre] = useState<Genre | undefined>(band?.genre ?? undefined);
    const [singles, setSingles] = useState<Single[] | undefined>();

    const [frontManName, setFrontManName] = useState<string | undefined>(band?.frontMan?.name ?? undefined);
    const [frontManBirthday, setFrontManBirthday] = useState<string | undefined>(band?.frontMan?.birthday ?? undefined);
    const [frontManPassportID, setFrontManPassportID] = useState<string | undefined>(band?.frontMan?.passportID ?? undefined);
    const [frontManX, setFrontManX] = useState<number | undefined>(band?.frontMan?.location.x ?? undefined);
    const [frontManY, setFrontManY] = useState<number | undefined>(band?.frontMan?.location.y ?? undefined);
    const [frontManZ, setFrontManZ] = useState<number | undefined>(band?.frontMan?.location.z ?? undefined);
    const [frontManLocationName, setFrontManLocationName] = useState<string | undefined>(band?.frontMan?.location.name ?? undefined);

    function convertStringToSingles(text: string) {
        let singles = text.split(',');
        singles = singles.map((single) => single.trim());
        const result: Single[] = singles.map((single) => ({name: single}));
        return result;
    }

    // TODO: добавить отправку формы обновления группы + накинуть все ограничения на поля из сваггера
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <div className='modal-container'>
                <h2>{band? `Update info about ${band.name}` : 'Create new band'}</h2>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <label className='input-container'>
                            Name
                            <input id='name' value={name} className='input' placeholder='e.g. Spacecrawlers'
                                   onChange={(e) => setName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Description
                            <input id='description' value={description} className='input'
                                   placeholder='e.g. Complex math rock group'
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Creation date
                            <input type='date' id='name' value={creationDate} className='input'
                                   onChange={(e) => setCreationDate(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Number of members
                            <input type='number' id='name' value={numberOfParticipants} className='input'
                                   onChange={(e) => setNumberOfParticipants(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Genre
                            <select className='select' onChange={(e) => setGenre(e.target.value as Genre)}>
                                {GENRES.map((genre) => {
                                    return (
                                        <option value={genre} key={genre}>{genre}</option>
                                    )
                                })}
                            </select>
                        </label>
                        <h3>Coordinates</h3>
                        <label className='input-container'>
                            Coordinate X
                            <input type='number' id='name' value={x} className='input' placeholder='e.g. 23746'
                                   onChange={(e) => setX(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Y
                            <input type='number' id='name' value={y} className='input' placeholder='e.g. 765'
                                   onChange={(e) => setY(Number(e.target.value))}/>
                        </label>

                        {!band &&
                            <>
                                <h3>Singles</h3>
                                <span className={styles.caption}>To add singles, please write their titles separated with comma, no brackets.</span>
                                <textarea id='singles' className='textarea' placeholder='e.g. Moonlight, The Love Of My Life, Midnight'
                                          onChange={(e) => setSingles(convertStringToSingles(e.target.value))}/>
                            </>
                        }
                    </div>
                    <div className={styles.right}>
                        <h3>Front Man</h3>
                        <label className='input-container'>
                            Name
                            <input id='name' value={frontManName} className='input' placeholder='e.g. Daniel Moon'
                                   onChange={(e) => setFrontManName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Birthday
                            <input type='date' id='birthday' value={frontManBirthday} className='input'
                                   onChange={(e) => setFrontManBirthday(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Passport ID*
                            <input id='passport-id' value={frontManPassportID} className='input'
                                   placeholder='e.g. RU623532526' required
                                   onChange={(e) => setFrontManPassportID(e.target.value)}/>
                        </label>
                        <h4>Front Man's location</h4>
                        <label className='input-container'>
                            Location title
                            <input id='location-name' value={frontManLocationName} className='input'
                                   placeholder='e.g. Toronto'
                                   onChange={(e) => setFrontManLocationName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Coordinate X*
                            <input type='number' id='x' value={frontManX} className='input'
                                   placeholder='e.g. 34' required
                                   onChange={(e) => setFrontManX(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Y*
                            <input type='number' id='y' value={frontManY} className='input'
                                   placeholder='e.g. 743' required
                                   onChange={(e) => setFrontManY(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Z*
                            <input type='number' id='z' value={frontManZ} className='input'
                                   placeholder='e.g. 0' required
                                   onChange={(e) => setFrontManZ(Number(e.target.value))}/>
                        </label>
                    </div>
                </div>

                <div className='buttons'>
                    <Button style='cancel' size='m' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button style='primary' size='m'>
                        {band ? 'Update' : 'Create'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}