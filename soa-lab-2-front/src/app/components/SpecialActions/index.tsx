'use client'

import styles from './styles.module.css';
import {Button} from "@/app/components/Button";
import {EyesIcon} from "@/static/icons";
import {useContext, useState} from "react";
import {Band} from "@/app/types/bands";
import {getBandsByGenre, getAllGenres, getSinglesCount, getBandsByDate, nominateBand} from "@/app/queries/bands";
import toast from 'react-hot-toast';
import {BandsContext} from "@/app/context/bands";
import {GenresContext} from "@/app/context/genres";

export const SpecialActions = () => {
    const { canFetch, setCanFetch } = useContext(BandsContext);
    const { genres } = useContext(GenresContext);

    const [genresFetched, setGenresFetched] = useState<string[]>();
    const [singlesCount, setSinglesCount] = useState<number>();
    const [bandsByDate, setBandsByDate] = useState<string[]>();
    const [genreToGet, setGenreToGet] = useState<string>(genres[0] ?? '');
    const [bandsByGenre, setBandsByGenre] = useState<string[]>();
    const [bandId, setBandId] = useState<number>(0);
    const [nominateGenre, setNominateGenre] = useState<string>(genres[0] ?? 'POP');


    function onGetAllGenresSubmit() {
        getAllGenres()
            .then((data) => {
                setGenresFetched(data);
            })
            .catch((err) => {
                toast.error(`${err}`);
            })
    }


    function onGetSinglesCount() {
        getSinglesCount()
            .then((data) => {
                setSinglesCount(data);
            })
            .catch((err) => {
                toast.error(`${err}`);
            })
    }

    function onGetBandsByDate() {
        getBandsByDate()
            .then((data) => {
                setBandsByDate(data);
            })
            .catch((err) => {
                toast.error(`${err}`);
            })
    }


    function onSetGenreToGet() {
        getBandsByGenre(genreToGet)
            .then((data) => {
                console.log("data is (get bu genre)", data);
                const bandsArray = Array.isArray(data) ? data : [data];
                if (data === undefined || data === null) {
                    toast.success('No bands found for the selected genre');
                    setBandsByGenre([]);
                    return;
                }
                  
                const bandIds = bandsArray.map((band: Band) => String(band.id));

                setCanFetch(canFetch + 1);
                console.log("bandsIds", bandIds);
                if (bandIds[0] === "undefined" || bandIds[0] === null) {
                    toast.success('No bands found for the selected genre');
                    setBandsByGenre([]);
                    return;
                }

                setBandsByGenre(bandIds);
            })
            .catch((err) => {
                toast.error(`${err}`);
            });
    }

    function onNominateBand() {
        if (!bandId || !nominateGenre) {
            toast.error('Please provide both Band ID and Genre');
            return;
        }

        nominateBand(bandId, nominateGenre)
            .then(() => {
                toast.success("Successfully nominated band!");
            })
            .catch((err) => {
                toast.error(`${err}`);
            });
    }
    

return (
        <div className={styles.container}>
            <h2 className={styles.title}>Special actions</h2>
            <div className={styles.content}>
                <div className={styles.genres}>
                    <label>
                        All available genres
                        <pre className={styles.json}><code>{genresFetched ? JSON.stringify(genresFetched, null, 2) : 'Click below to get available genres'}</code></pre>
                    </label>
                    <Button style='accent-green' size='s' onClick={onGetAllGenresSubmit}>
                        <EyesIcon className={`${styles.icon} ${styles.green}`}/>
                        Get genres
                    </Button>
                </div>
                <div className={styles.band}>
                    <label>
                        Get total singles count
                        <pre className={styles.json}><code>{singlesCount ? JSON.stringify(singlesCount, null, 2) : 'Click below to get singles count'}</code></pre>
                    </label>
                    <Button style='accent' size='s' onClick={onGetSinglesCount}>
                        <EyesIcon className={`${styles.icon} ${styles.accent}`}/>
                        Get singles count
                    </Button>
                </div>
                <div className={styles.genres}>
                    <label>
                        Get bands by creation date
                        <pre className={styles.json}><code>{bandsByDate ? JSON.stringify(bandsByDate, null, 2) : 'Click below to get bands by creation date'}</code></pre>
                    </label>
                    <Button style='accent-green' size='s' onClick={onGetBandsByDate}>
                        <EyesIcon className={`${styles.icon} ${styles.green}`}/>
                        Get bands by creation date
                    </Button>
                </div>
                <div className={styles.genres}>
                    <label>
                        Get bands by creation date
                        <pre className={styles.json}><code>{bandsByDate ? JSON.stringify(bandsByDate, null, 2) : 'Click below to get bands by creation date'}</code></pre>
                    </label>
                    <Button style='accent' size='s' onClick={onGetBandsByDate}>
                        <EyesIcon className={`${styles.icon} ${styles.accent}`}/>
                        Get bands by creation date
                    </Button>
                </div>
                <div className={styles.genres}>
                    <label className={styles.select}>
                        Get bands with selected genre
                        <select className='select' onChange={(e) => setGenreToGet(e.target.value)} value={genreToGet}>
                            {genres.map((genre) => {
                                return (
                                    <option value={genre} key={genre}>{genre}</option>
                                )
                            })}
                        </select>
                        <pre className={styles.json}>
                            {bandsByGenre && bandsByGenre.length > 0 ? (
                                <ul>
                                    {bandsByGenre.map((bandName, index) => (
                                        <li key={index} className={styles.bandItem}>
                                            {bandName}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                'Click below to get bands by selected genre'
                            )}
                        </pre>
                    </label>
                    <Button style='accent-green' size='s' onClick={onSetGenreToGet}>
                        <EyesIcon className={`${styles.icon} ${styles.green}`}/>
                        Get Bands
                    </Button>
                </div>
                <div className={styles.genres}>
                    <label>
                        Nominate Band for Genre
                        <input
                            type="number"
                            value={bandId}
                            onChange={(e) => setBandId(Number(e.target.value))}
                            placeholder="Enter Band ID"
                        />
                        <select className='select' onChange={(e) => setNominateGenre(e.target.value)} value={nominateGenre}>
                            {genres.map((genre) => (
                                <option value={genre} key={genre}>{genre}</option>
                            ))}
                        </select>
                    </label>
                    <Button style='accent-green' size='s' onClick={onNominateBand}>
                        <EyesIcon className={`${styles.icon} ${styles.green}`}/>
                        Nominate Band
                    </Button>
                </div>
            </div>
        </div>
    )
}