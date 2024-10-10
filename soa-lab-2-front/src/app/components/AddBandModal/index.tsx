import {Button} from "@/app/components/Button";
import {Modal} from "@/app/components/Modal";
import {useContext, useState} from "react";
import {Genre, GENRES, GenreText} from "@/app/types/genre";
import styles from './styles.module.css';
import {Single} from "@/app/types/single";
import {BAND_MOCK} from "@/app/mocks/bands";
import {createBand} from "@/app/queries/bands";
import toast from 'react-hot-toast';
import {PersonToBandDTO} from "@/app/types/person";
import {BandsContext} from "@/app/context/bands";

type AddBandModalProps = {
    isVisible: boolean;
    onClose: () => void;
}

export const AddBandModal = ({ isVisible, onClose }: AddBandModalProps) => {
    const [name, setName] = useState<string>(BAND_MOCK.name);
    const [description, setDescription] = useState<string>(BAND_MOCK.description);
    const [x, setX] = useState<number>(BAND_MOCK.coordinates.x);
    const [y, setY] = useState<number>(BAND_MOCK.coordinates.y);
    const [creationDate, setCreationDate] = useState<Date>(new Date(BAND_MOCK.creationDate));
    const [numberOfParticipants, setNumberOfParticipants] = useState<number>(BAND_MOCK.numberOfParticipants);
    const [genre, setGenre] = useState<Genre>(BAND_MOCK.genre);
    const [textSingles, setTextSingles] = useState<string | undefined>();

    const [frontManName, setFrontManName] = useState<string | undefined>(BAND_MOCK.frontMan?.name);
    const [frontManBirthday, setFrontManBirthday] = useState<string | undefined>(BAND_MOCK.frontMan?.birthday);
    const [frontManPassportID, setFrontManPassportID] = useState<string | undefined>(BAND_MOCK.frontMan?.passportID);
    const [frontManX, setFrontManX] = useState<number | undefined>(BAND_MOCK.frontMan?.location.x);
    const [frontManY, setFrontManY] = useState<number | undefined>(BAND_MOCK.frontMan?.location.y);
    const [frontManZ, setFrontManZ] = useState<number | undefined>(BAND_MOCK.frontMan?.location.z);
    const [frontManLocationName, setFrontManLocationName] = useState<string | undefined>(BAND_MOCK.frontMan?.location.name);

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
            genre: GenreText[genre] as Genre,
            frontMan: getFrontMan(),
            singles: getSingles()
        }).then((data) =>{
            toast.success("Successfully created band");
            setCanFetch(canFetch + 1);
            onClose();
        }).catch((err) => {
            toast.error(`Error occurred: ${err}`);
        })
    }

    const getFrontMan = (): PersonToBandDTO |  undefined => {
        if (frontManPassportID !== undefined && frontManX !== undefined && frontManY !== undefined && frontManZ !== undefined) {
            const locationBase = {
                x: frontManX,
                y: frontManY,
                z: frontManZ
            }
            const name = frontManName ? { name: frontManName } : undefined;
            const birthday = frontManBirthday ? { birthday: frontManBirthday } : undefined;

            const location = !frontManLocationName ? locationBase : { name: frontManLocationName, ...locationBase };

            return {
                ...name,
                ...birthday,
                passportID: frontManPassportID,
                location: location
            };
        }
        return;
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
                <h2>Create new band</h2>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <label className='input-container'>
                            Name*
                            <input id='name' value={name ?? undefined} minLength={1} className='input' required
                                   onChange={(e) => setName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Description*
                            <input id='description' value={description ?? undefined} className='input' required
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Creation date*
                            <input type='datetime-local' id='name' value={creationDate ? creationDate.toString() : undefined} className='input' required
                                   onChange={(e) => setCreationDate(new Date(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Number of members*
                            <input type='number' id='number-of-members' value={numberOfParticipants ?? undefined} className='input' required
                                   onChange={(e) => setNumberOfParticipants(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Genre*
                            <select className='select' onChange={(e) => setGenre(e.target.value as Genre)} value={genre} required>
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
                            <input type='number' min="1" step={1} id='coordinate-x' value={x ?? undefined} className='input' required
                                   onChange={(e) => setX(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Y*
                            <input type='number' id='coordinate-y' value={y ?? undefined} className='input' required
                                   onChange={(e) => setY(Number(e.target.value))}/>
                        </label>

                        <h3>Singles</h3>
                        <span className={styles.caption}>To add singles, please write their titles separated with comma, no brackets.</span>
                        <textarea id='singles' value={textSingles ?? undefined} className='textarea'
                                  onChange={(e) => setTextSingles(e.target.value)}/>
                    </div>
                    <div className={styles.right}>
                        <h3>Front Man</h3>
                        <label className='input-container'>
                            Name
                            <input id='name' minLength={1} value={frontManName ?? undefined} className='input'
                                   onChange={(e) => setFrontManName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Birthday
                            <input type='date' id='birthday' value={frontManBirthday ?? undefined} className='input'
                                   onChange={(e) => setFrontManBirthday(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Passport ID*
                            <input id='passport-id' value={frontManPassportID ?? undefined} className='input'
                                   onChange={(e) => setFrontManPassportID(e.target.value)}/>
                        </label>
                        <h4>Front Man's location</h4>
                        <label className='input-container'>
                            Location title
                            <input id='location-name' value={frontManLocationName ?? undefined} className='input'
                                   onChange={(e) => setFrontManLocationName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Coordinate X*
                            <input type='number' id='x' value={frontManX ?? undefined} className='input'
                                   onChange={(e) => setFrontManX(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Y*
                            <input type='number' id='y' value={frontManY ?? undefined} className='input'
                                   onChange={(e) => setFrontManY(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Z*
                            <input type='number' step={1} pattern='[0-9]*[^.,]' id='z' value={frontManZ ?? undefined} className='input'
                                   onChange={(e) => setFrontManZ(Number(e.target.value))}/>
                        </label>
                    </div>
                </div>

                <div className={`buttons`}>
                    <Button style='cancel' size='m' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button style='primary' size='m' submit onClick={onSubmit}>
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}