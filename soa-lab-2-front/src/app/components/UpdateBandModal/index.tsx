import {Button} from "@/app/components/Button";
import {Modal} from "@/app/components/Modal";
import {useContext, useState} from "react";
import {Band} from "@/app/types/bands";
import {Genre, GENRES} from "@/app/types/genre";
import styles from './styles.module.css';
import {Single} from "@/app/types/single";
import {BAND_MOCK} from "@/app/mocks/bands";
import {createBand} from "@/app/queries/bands";
import toast from 'react-hot-toast';
import {PersonToBandDTO} from "@/app/types/person";
import {BandsContext} from "@/app/context/bands";

type UpdateBandModalProps = {
    band: Band;
    isVisible: boolean;
    onClose: () => void;
}

export const UpdateBandModal = ({ band, isVisible, onClose }: UpdateBandModalProps) => {
    const [name, setName] = useState<string | undefined>(band?.name ?? undefined);
    const [description, setDescription] = useState<string | undefined>(band?.description ?? undefined);
    const [x, setX] = useState<number | undefined>(band?.coordinates.x ?? undefined);
    const [y, setY] = useState<number | undefined>(band?.coordinates.y ?? undefined);
    const [creationDate, setCreationDate] = useState<Date | undefined>(band?.creationDate ? new Date(band?.creationDate) : undefined);
    const [numberOfParticipants, setNumberOfParticipants] = useState<number | undefined>(band?.numberOfParticipants ?? undefined);
    const [genre, setGenre] = useState<Genre | undefined>(band?.genre ?? Genre.ROCK);
    const [textSingles, setTextSingles] = useState<string | undefined>();

    const [frontManName, setFrontManName] = useState<string | undefined>(band?.frontMan?.name ?? undefined);
    const [frontManBirthday, setFrontManBirthday] = useState<string | undefined>(band?.frontMan?.birthday ?? undefined);
    const [frontManPassportID, setFrontManPassportID] = useState<string | undefined>(band?.frontMan?.passportID ?? undefined);
    const [frontManX, setFrontManX] = useState<number | undefined>(band?.frontMan?.location.x ?? undefined);
    const [frontManY, setFrontManY] = useState<number | undefined>(band?.frontMan?.location.y ?? undefined);
    const [frontManZ, setFrontManZ] = useState<number | undefined>(band?.frontMan?.location.z ?? undefined);
    const [frontManLocationName, setFrontManLocationName] = useState<string | undefined>(band?.frontMan?.location.name ?? undefined);

    const { canFetch, setCanFetch } = useContext(BandsContext);

    function convertStringToSingles(text: string) {
        let singles = text.split(',');
        singles = singles.map((single) => single.trim());
        const result: Single[] = singles.map((single) => ({name: single}));
        return result;
    }

    function convertSinglesToString(singles: Single[]) {
        const names = singles.map((single) => single.name);
        return names.join(', ');
    }

    function onSubmit() {
        if (!name || !x || !y || !creationDate || !numberOfParticipants || !description || !genre) {
            toast.error("Please enter all the required values");
            return;
        }

        createBand({
            name,
            coordinates: {
                x,
                y,
            },
            creationDate: creationDate?.toISOString(),
            numberOfParticipants,
            description,
            genre,
            frontMan: getFrontMan(),
            singles: getSingles()
        }).then((data) =>{
            setCanFetch(canFetch + 1);
        })
    }

    const getFrontMan = (): PersonToBandDTO |  undefined => {
        if (frontManPassportID !== undefined && frontManX !== undefined && frontManY !== undefined && frontManZ !== undefined) {
            return {
                name: frontManName,
                birthday: frontManBirthday,
                passportID: frontManPassportID,
                location: {
                    name: frontManLocationName,
                    x: frontManX,
                    y: frontManY,
                    z: frontManZ
                }
            }
        }
        else {
            return;
        }
    }

    const getSingles = (): Omit<Single, 'id'>[] | undefined => {
        if (textSingles !== undefined) {
            return (convertStringToSingles(textSingles));
        }
        return;
    }

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <form className='modal-container' onSubmit={(e) => e.preventDefault()}>
                <h2>{band? `Update info about ${band.name}` : 'Create new band'}</h2>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <label className='input-container'>
                            Name*
                            <input id='name' value={name ?? " "} minLength={1} className='input'
                                   onChange={(e) => setName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Description*
                            <input id='description' value={description ?? " "} className='input'
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Creation date*
                            <input type='datetime-local' id='name' value={creationDate ? creationDate.toString() : ' '} className='input'
                                   onChange={(e) => setCreationDate(new Date(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Number of members*
                            <input type='number' id='number-of-members' value={numberOfParticipants ?? " "} className='input'
                                   onChange={(e) => setNumberOfParticipants(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Genre*
                            <select className='select' onChange={(e) => setGenre(e.target.value as Genre)} value={genre}>
                                {GENRES.map((genre) => {
                                    return (
                                        <option value={genre} key={genre}>{genre}</option>
                                    )
                                })}
                            </select>
                        </label>
                        <h3>Coordinates*</h3>
                        <label className='input-container'>
                            Coordinate X*
                            <input type='number' min="1" step={1} id='coordinate-x' value={x ?? " "} className='input'
                                   onChange={(e) => setX(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Y*
                            <input type='number' id='coordinate-y' value={y ?? " "} className='input'
                                   onChange={(e) => setY(Number(e.target.value))}/>
                        </label>

                        {!band &&
                            <>
                                <h3>Singles</h3>
                                <span className={styles.caption}>To add singles, please write their titles separated with comma, no brackets.</span>
                                <textarea id='singles' value={textSingles ?? " "} className='textarea'
                                          onChange={(e) => setTextSingles(e.target.value)}/>
                            </>
                        }
                    </div>
                    <div className={styles.right}>
                        <h3>Front Man</h3>
                        <label className='input-container'>
                            Name
                            <input id='name' minLength={1} value={frontManName ?? " "} className='input'
                                   onChange={(e) => setFrontManName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Birthday
                            <input type='date' id='birthday' value={frontManBirthday ?? " "} className='input'
                                   onChange={(e) => setFrontManBirthday(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Passport ID*
                            <input id='passport-id' value={frontManPassportID ?? " "} className='input'
                                   onChange={(e) => setFrontManPassportID(e.target.value)}/>
                        </label>
                        <h4>Front Man's location</h4>
                        <label className='input-container'>
                            Location title
                            <input id='location-name' value={frontManLocationName ?? " "} className='input'
                                   onChange={(e) => setFrontManLocationName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Coordinate X*
                            <input type='number' id='x' value={frontManX ?? " "} className='input'
                                   onChange={(e) => setFrontManX(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Y*
                            <input type='number' id='y' value={frontManY ?? " "} className='input'
                                   onChange={(e) => setFrontManY(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Z*
                            <input type='number' step={1} pattern='[0-9]*[^.,]' id='z' value={frontManZ ?? " "} className='input'
                                   onChange={(e) => setFrontManZ(Number(e.target.value))}/>
                        </label>
                    </div>
                </div>

                <div className={styles.container}>
                    {!band ? <Button style='accent' size='s' onClick={onApplyPresetClick}>Apply preset</Button> : <div></div>}
                    <div className={`buttons ${styles.buttons}`}>
                        <Button style='cancel' size='m' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button style='primary' size='m' submit onClick={onSubmit}>
                            {band ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}