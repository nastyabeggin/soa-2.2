'use client'

import {Button} from "@/app/components/Button";
import {Modal} from "@/app/components/Modal";
import {useContext, useState} from "react";
import styles from './styles.module.css';
import {createBand} from "@/app/queries/bands";
import toast from 'react-hot-toast';
import {BandsContext} from "@/app/context/bands";
import {GenresContext} from "@/app/context/genres";

type AddBandModalProps = {
    isVisible: boolean;
    onClose: () => void;
}

export const AddBandModal = ({ isVisible, onClose }: AddBandModalProps) => {
    const { canFetch, setCanFetch } = useContext(BandsContext);
    const { genres } = useContext(GenresContext);

    const [name, setName] = useState<string | undefined>();
    const [x, setX] = useState<number | undefined>();
    const [y, setY] = useState<number | undefined>();
    const [numberOfParticipants, setNumberOfParticipants] = useState<number | undefined>();
    const [genre, setGenre] = useState<string>(genres[0] ?? '');
    const [singlesCount, setSinglesCount] = useState<number | undefined>();
    const [albumsCount, setalbumsCount] = useState<number | undefined>();
    const [studioName, setStudioName] = useState<string | undefined>();

    function onSubmit() {
        if (!name || x == undefined || y === undefined || numberOfParticipants === undefined || singlesCount  === undefined || albumsCount  === undefined|| !studioName || !genre) {
            toast.error("Please enter all the required values: Name, X, Y, Genre, studio name, singles count");
            return;
        }

        createBand({
            name: name.trim(),
            coordinates: {
                x,
                y
            },
            numberOfParticipants,
            genre,
            singlesCount,
            albumsCount,
            studio: {
                name: studioName
            }
        }).then(() =>{
            toast.success("Successfully created band");
            setCanFetch(canFetch + 1);
            onClose();
        }).catch((err) => {
            toast.error(`${err}`);
        })
    }

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <form className='modal-container' onSubmit={(e) => e.preventDefault()}>
                <h2>Create new band</h2>
                <div className={styles.content}>
                    <div className={styles.center}>
                        <label className='input-container'>
                            Name*
                            <input id='name' value={name ?? ''} minLength={1} className='input' required
                                   onChange={(e) => setName(e.target.value)}/>
                        </label>
                        <label className='input-container'>
                            Number of members*
                            <input type='number' id='number-of-members' value={numberOfParticipants ?? ''} className='input' required
                                   onChange={(e) => setNumberOfParticipants(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Genre*
                            <select className='select' onChange={(e) => setGenre(e.target.value)} value={genre} required>
                                {genres.map((genre) => {
                                    return (
                                        <option value={genre} key={genre}>{genre}</option>
                                    )
                                })}
                            </select>
                        </label>
                        <h3>Coordinates*</h3>
                        <label className='input-container'>
                            Coordinate X*
                            <input type='number' min="1" step={1} id='coordinate-x' value={x ?? ''} className='input' required
                                   onChange={(e) => setX(Number(e.target.value))}/>
                        </label>
                        <label className='input-container'>
                            Coordinate Y*
                            <input type='number' id='coordinate-y' value={y ?? ''} className='input' required
                                   onChange={(e) => setY(Number(e.target.value))}/>
                        </label>

                        <h3>Singles count*</h3>
                        <input type='number' id='singles' value={singlesCount ?? ''} className='input'
                               onChange={(e) => setSinglesCount(Number(e.target.value))}/>
                        <h3>albums count*</h3>
                        <input type='number' id='albumsCount' value={albumsCount ?? ''} className='input'
                               onChange={(e) => setalbumsCount(Number(e.target.value))}/>
                        <h3>Studio name*</h3>
                        <label className='input-container'>
                            <input id='studio-name' value={studioName ?? ''} minLength={1} className='input' required
                                   onChange={(e) => setStudioName(e.target.value)}/>
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