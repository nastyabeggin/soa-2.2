import styles from './styles.module.css';
import {Button} from "@/app/components/Button";
import {DeleteIcon, EyesIcon} from "@/static/icons";
import {useState} from "react";
import {Genre, GENRES} from "@/app/types/genre";
import {Band} from "@/app/types/bands";

export const SpecialActions = () => {
    const [genres, setGenres] = useState<Genre[]>();
    const [minBand, setMinBand] = useState<Band>();
    const [genreToDelete, setGenreToDelete] = useState<Genre>();

return (
        <div className={styles.container}>
            <h2 className={styles.title}>Special actions</h2>
            <div className={styles.content}>
                <div className={styles.genres}>
                    <label>
                        All available genres
                        <pre className={styles.json}>{genres ? JSON.stringify(genres) : 'Click below to get available genres'}</pre>
                    </label>
                    <Button style='accent-green' size='s'>
                        <EyesIcon className={`${styles.icon} ${styles.green}`}/>
                        Get genres
                    </Button>
                </div>
                <div className={styles.band}>
                    <label>
                        Get band with minimal genre
                        <pre className={styles.json}>{minBand ? JSON.stringify(minBand) : 'Click below to get band with minimal genre'}</pre>
                    </label>
                    <Button style='accent' size='s'>
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
                    <Button style='danger' size='s'>
                        <DeleteIcon className={`${styles.icon} ${styles.danger}`}/>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}