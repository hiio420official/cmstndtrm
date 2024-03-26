import {PagingType} from "@/libs/utils/utils.d";
import {Paging} from "@/libs/utils/utils";

type PropsType = {
    paging:PagingType
}

export default function PagingNav({paging}:PropsType) {

    const page = new Paging(paging);
    return <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
            {page.curPrevPageOk && <>
                <li>
                    <button
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none focus:ring-0 active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                        type={"submit"} value={1} name={"page"}
                    >First
                    </button
                    >
                </li>
                <li>
                    <button
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none focus:ring-0 active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                        type={"submit"} value={page.curPrevPage} name={"page"}
                    >Previous
                    </button
                    >
                </li>

            </>}
            {Array(page.curPagingSize).fill(0).map((_, i) => {
                return <li  key={Math.random()}>
                    <button
                        className={`relative block rounded px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 hover:text-black focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500 ${paging.page === page.curFirstPage + i && "bg-black text-white"}`}
                        type={"submit"} value={page.curFirstPage + i} name={"page"}
                    >{page.curFirstPage + i}</button>
                </li>
            })}
            {page.curNextPageOk && <>
                <li>
                    <button
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                        type={"submit"} value={page.curNextPage} name={"page"}
                    >Next
                    </button>
                </li>
                <li>
                    <button
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                        type={"submit"} value={page.lastPage} name={"page"}
                    >Last
                    </button>
                </li>
            </>}
        </ul>
    </nav>
}