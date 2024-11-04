'use client';

import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import {useContext, useState } from "react";
import { Band } from "@/app/types/bands";
import styles from './styles.module.css';
import { updateBandById } from "@/app/queries/bands";
import toast from 'react-hot-toast';
import { BandsContext } from "@/app/context/bands";
import { GenresContext } from "@/app/context/genres";

type UpdateBandModalProps = {
    band: Band;
    isVisible: boolean;
    onClose: () => void;
}

export const UpdateBandModal = ({ band, isVisible, onClose }: UpdateBandModalProps) => {
    const { canFetch, setCanFetch } = useContext(BandsContext);
    const { genres } = useContext(GenresContext);

    const [name, setName] = useState<string | undefined>(band?.name);
    const [x, setX] = useState<number | undefined>(band?.coordinates.x);
    const [y, setY] = useState<number | undefined>(band?.coordinates.y);
    const [numberOfParticipants, setNumberOfParticipants] = useState<number | undefined>(band?.numberOfParticipants);
    const [genre, setGenre] = useState<string | undefined>(band?.genre);
    const [singlesCount, setSinglesCount] = useState<number | undefined>(band?.singlesCount);
    const [studioName, setStudioName] = useState<string | undefined>(band.studio.name);

    function onSubmit() {
        if (!name || x === undefined || y === undefined || numberOfParticipants === undefined || !genre || !singlesCount || !studioName) {
            toast.error("Please enter all the required values: Name, X, Y, number of members, genre, singles count, and studio name.");
            return;
        }

        if (String(numberOfParticipants).includes('.') || String(numberOfParticipants).includes('-') || String(numberOfParticipants).includes('e')) {
            toast.error("Invalid value in field Number of members");
            return;
        }

        if (String(singlesCount).includes('.') || String(singlesCount).includes('-') || String(singlesCount).includes('e')) {
            toast.error("Invalid value in field singlesCount");
            return;
        }

        if ((String(x).length - String(x).lastIndexOf('.') > 3 && String(x).includes('.')) || String(x).length > 10 || String(x).startsWith('.')) {
            toast.error("Invalid value in field x");
            return;
        }

        if ((String(y).length - String(y).lastIndexOf('.') > 3 && String(y).includes('.')) || String(y).length > 10 || String(y).startsWith('.')) {
            toast.error("Invalid value in field y");
            return;
        }

        updateBandById(band.id, {
            name: name,
            coordinates: {
                x,
                y,
            },
            numberOfParticipants,
            genre,
            singlesCount,
            studio: {
                name: studioName
            }
        }).then(() => {
            toast.success("Successfully updated band");
            setCanFetch(canFetch + 1);
            onClose();
        }).catch((err) => {
            toast.error(`${err}`);
        });
    }

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <form className='modal-container' onSubmit={(e) => e.preventDefault()}>
                <h2>{band ? `Update info about ${band.name}` : 'Update Band'}</h2>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <label className='input-container'>
                            Name*
                            <input id='name' value={name ?? ''} minLength={1} className='input'
                                onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className='input-container'>
                            Number of members*
                            <input type='number' id='number-of-members' value={numberOfParticipants ?? ''}
                                className='input'
                                onChange={(e) => setNumberOfParticipants(Number(e.target.value))} />
                        </label>
                        <label className='input-container'>
                            Genre*
                            <select className='select' onChange={(e) => setGenre(e.target.value)}
                                value={genre}>
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
                            <input type='number' min="1" step={1} id='coordinate-x' value={x ?? ''} className='input'
                                onChange={(e) => setX(Number(e.target.value))} />
                        </label>
                        <label className='input-container'>
                            Coordinate Y*
                            <input type='number' id='coordinate-y' value={y ?? ''} className='input'
                                onChange={(e) => setY(Number(e.target.value))} />
                        </label>
                    </div>
                    <div className={styles.right}>
                        <label className='input-container'>
                            Singles count*
                            <input type='number' id='singles' value={singlesCount ?? ''} className='input'
                                onChange={(e) => setSinglesCount(Number(e.target.value))} />
                        </label>
                        <label className='input-container'>
                            Studio name*
                            <input id='studio-name' value={studioName ?? ''} minLength={1} className='input'
                                onChange={(e) => setStudioName(e.target.value)} />
                        </label>
                    </div>
                </div>

                <div className={`buttons`}>
                    <Button style='cancel' size='m' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button style='primary' size='m' submit onClick={onSubmit}>
                        Update
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
