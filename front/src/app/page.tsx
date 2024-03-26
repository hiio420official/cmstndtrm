import {FormEventHandler} from "react";
import {redirect} from "next/navigation";
import {Paging} from "../libs/utils";

type searchParamsType = { [key: string]: string | null }
export default async function Home({searchParams}: { searchParams: searchParamsType }) {

    async function getData(searchParam?: searchParamsType) {
        "use server";
        const url = new URL("http://localhost:4882")
        Object.keys(searchParams).map((param: string) => {
            url.searchParams.append(param, searchParams[param] as string)
        });
        let resp = await fetch(url, {next:{revalidate:60*60}});
        let result = await resp.json()
        return result
    }

    async function go(formData: FormData = new FormData()) {
        "use server";
        let curPage:string | null = searchParams["page"]
        let curSrchTxt:string | null = searchParams["srchTxt"]
        let page:FormDataEntryValue | null = formData.get('page')

        const url = new URL("http://localhost:3000")
        url.searchParams.append("srchTxt", formData.get('srchTxt') as string);

        console.log(typeof page,typeof curPage,page,curPage,formData.get('srchTxt'))
        if(curPage && !page){
            url.searchParams.append("page", curPage as string);
        }else if(page){
            url.searchParams.append("page", page as string);
        }

        if(curSrchTxt===formData.get('srchTxt')as string && curPage===page){
            console.log("redirect(url.toString());");
            return false;
        }

        redirect(url.toString());

    }

    const result = await getData(searchParams);
    const {items, paging} = result;
    console.log(paging)
    const page:Paging = new Paging(paging)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action={go} className={"w-full overflow-hidden"}>
                <div className="pt-2 relative text-gray-600 w-px245 w-max">
                    <input
                        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none relative"
                        type="search" name="srchTxt" placeholder="Search" defaultValue={searchParams["srchTxt"] || ""}/>
                    <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                        <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                             viewBox="0 0 56.966 56.966" style={{background: "new 0 0 56.966 56.966"}}
                             xmlSpace="preserve"
                             width="512px" height="512px">
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table
                                    className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                    <thead
                                        className="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">First</th>
                                        <th scope="col" className="px-6 py-4">Last</th>
                                        <th scope="col" className="px-6 py-4">Handle</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items?.map((item: { [key: string]: string }) => {
                                        return <tr className="border-b border-neutral-200 dark:border-white/10"
                                                   key={Math.random()}>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{item["번호"]}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item[Object.keys(item)[1]]}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item[Object.keys(item)[2]]}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item[Object.keys(item)[3]]}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <nav aria-label="Page navigation example">
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
                            return <li>
                                <button
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 hover:text-black focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500 ${paging.page===page.curFirstPage+i&&"bg-neutral-700  text-white"}`}
                                    type={"submit"} value={page.curFirstPage + i} name={"page"}
                                >{page.curFirstPage+i}</button>
                            </li>
                        })}
                        {page.curNextPageOk && <>
                            <li>
                                <button
                                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                    type={"submit"} value={page.curNextPage} name={"page"}
                                >Next</button>
                            </li>
                            <li>
                                <button
                                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                    type={"submit"} value={page.lastPage} name={"page"}
                                >Last</button>
                            </li>
                        </>}
                    </ul>
                </nav>
            </form>
        </main>
    );
}
