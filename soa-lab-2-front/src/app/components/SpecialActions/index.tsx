import styles from './styles.module.css';
import {Button} from "@/app/components/Button";
import {DeleteIcon, EyesIcon} from "@/static/icons";
import {useContext, useState} from "react";
import {Genre, GENRES} from "@/app/types/genre";
import {Band} from "@/app/types/bands";
import {deleteBandsByGenre, getAllGenres, getBandWithMinGenre} from "@/app/queries/bands";
import toast from 'react-hot-toast';
import {BandsContext} from "@/app/context/bands";

export const SpecialActions = () => {
    const [genres, setGenres] = useState<Genre[]>();
    const [minBand, setMinBand] = useState<Band>();
    const [genreToDelete, setGenreToDelete] = useState<Genre>(Genre.ROCK);

    const { canFetch, setCanFetch } = useContext(BandsContext);

    function onGetAllGenresSubmit() {
        getAllGenres()
            .then((data) => {
                setGenres(data);
            })
    }

    function onGetBandWithMinimalGenre() {
        getBandWithMinGenre()
            .then((data) => {
                setMinBand(data);
            })
    }

    function onDeleteBandsByGenre() {
        deleteBandsByGenre(genreToDelete)
            .then((data) => {
                setCanFetch(canFetch + 1);
                toast.success("Successfully deleted");
            })
    }

return (
        <div className={styles.container}>
            <h2 className={styles.title}>Special actions</h2>
            <div className={styles.content}>
                <div className={styles.genres}>
                    <label>
                        All available genres
                        <pre className={styles.json}><code>{genres ? JSON.stringify(genres, null, 2) : 'Click below to get available genres'}</code></pre>
                    </label>
                    <Button style='accent-green' size='s' onClick={onGetAllGenresSubmit}>
                        <EyesIcon className={`${styles.icon} ${styles.green}`}/>
                        Get genres
                    </Button>
                </div>
                <div className={styles.band}>
                    <label>
                        Get band with minimal genre
                        <pre className={styles.json}><code>{minBand ? JSON.stringify(minBand, null, 2) : 'Click below to get band with minimal genre'}</code></pre>
                    </label>
                    <Button style='accent' size='s' onClick={onGetBandWithMinimalGenre}>
                        <EyesIcon className={`${styles.icon} ${styles.blue}`}/>
                        Get band
                    </Button>
                </div>
                <div className={styles.genres}>
                    <label className={styles.select}>
                        Delete all bands with selected genre
                        <select className='select' onChange={(e) => setGenreToDelete(e.target.value as Genre)} value={genreToDelete}>
                            {GENRES.map((genre) => {
                                return (
                                    <option value={genre} key={genre}>{genre}</option>
                                )
                            })}
                        </select>
                    </label>
                    <Button style='danger' size='s' onClick={onDeleteBandsByGenre}>
                        <DeleteIcon className={`${styles.icon} ${styles.danger}`}/>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}