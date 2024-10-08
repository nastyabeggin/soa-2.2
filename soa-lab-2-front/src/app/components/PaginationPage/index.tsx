import styles from './styles.module.css';
import {Button} from "@/app/components/Button";
import {LeftArrowIcon, RightArrowIcon} from "@/static/icons";
import {getPagesForView} from "@/app/components/PaginationPage/helpers";
import {useContext} from "react";
import {PaginationContext, TOTAL_PAGES} from "@/app/context/pagination";

export const PaginationPage = () => {
    // TODO: totalPages - брать из запроса и добавлять в пагинацию
    const { page, setPage } = useContext(PaginationContext);
    const availablePages = getPagesForView(TOTAL_PAGES, page);

    const onLeftClick = () => {
        if (page >= 2) {
            setPage(page - 1);
        }
    }

    const onRightClick = () => {
        if (page <= TOTAL_PAGES - 1) {
            setPage(page + 1);
        }
    }

    const onPageClick = (page: number) => {
        setPage(page);
    }

    return (
        <div className={styles.container}>
            <Button style='transparent' size='m' className={page === 1 ? styles.disabled : ''} onClick={onLeftClick}>
                <LeftArrowIcon className={`${styles.icon} ${page === 1 ? styles.disabled : ''}`}/>
                Previous
            </Button>

            <div className={styles.pages}>
                {availablePages.pagesStart.map((page) => {
                    return (
                        <div key={page.item} className={`${styles.page} ${page.active ? styles.active : ''}`} onClick={() => onPageClick(page.item)}>
                            {page.item}
                        </div>
                    )
                })}
                {availablePages.pagesMiddle ? (
                    <>
                        ...
                        {availablePages.pagesMiddle.map((page) => {
                            return (
                                <div key={page.item} className={`${styles.page} ${page.active ? styles.active : ''}`} onClick={() => onPageClick(page.item)}>
                                    {page.item}
                                </div>
                            )
                        })}
                    </>
                ):''}
                {availablePages.pagesEnd ? (
                    <>
                        ...
                        {availablePages.pagesEnd.map((page) => {
                            return (
                                <div key={page.item} className={`${styles.page} ${page.active ? styles.active : ''}`} onClick={() => onPageClick(page.item)}>
                                    {page.item}
                                </div>
                            )
                        })}
                    </>
                ):''}
            </div>

            <Button style='transparent' size='m' className={page === TOTAL_PAGES ? styles.disabled : ''} onClick={onRightClick}>
                Next
                <RightArrowIcon className={`${styles.icon} ${page === TOTAL_PAGES ? styles.disabled : ''}`}/>
            </Button>
        </div>
    )
}