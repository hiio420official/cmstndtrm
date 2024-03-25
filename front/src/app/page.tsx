import Image from "next/image";
type PropsType = {
    searchParams: searchParmasType
};
type searchParmasType= { [key: string]: string  };
export default async function Home({searchParams}:PropsType) {

    const searchParamTxt = Object.keys(searchParams).reduce((arr:string[],k:string)=>[...arr,`${k}=${searchParams[k]}`],[]).join("&")
    const getData = async(searchParams:searchParmasType)=>{
        const url = new URL("http://localhost:4882")
        Object.keys(searchParams).map((k)=>{
            url.searchParams.append(k,searchParams[k] || "");
        })

        const resp = await fetch(url,{cache:"no-cache"})
        const respJson = await resp.json();
        const {data,page,last_page} = respJson;
        console.log(data);
        return respJson
    }
    const resp = await getData(searchParams);
    let last = Math.ceil(resp.page/10) * 10 >= resp.last_page?resp.last_page:Math.ceil(resp.page/10) * 10;
    let first = last -9;
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action={"/"} method={"GET"}>
                <div className="pt-2 relative mx-auto text-gray-600">
                    <input
                        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                        type="search" name="srchTxt" placeholder="Search" value={resp.srchTxt}/>
                    <button type="submit" className="absolute right-1 h-4/5">
                        <Image src={"/images/search-svgrepo-com.svg"} alt={"search images"} width="40" height="40"
                               className={"h-4/5"}/>
                    </button>
                </div>

                <table
                    className="min-w-full text-left text-sm font-light text-surface dark:text-white mt-1">
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
                    {resp.data?.map((d:any)=> {
                        return <tr className="border-b border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{d["번호"]}</td>
                            <td className="whitespace-nowrap px-6 py-4">{d["공통표준용어명"]}</td>
                            <td className="whitespace-nowrap px-6 py-4">{d["공통표준용어영문약어명"]}</td>
                            <td className="whitespace-nowrap px-6 py-4">{d["공통표준용어설명"]}</td>
                        </tr>
                    })}


                    </tbody>
                </table>

                <nav className={"mt-1"}>
                    <ul className="list-style-none flex justify-center">
                        {
                            1<resp.page&& <>
                            <li>
                                <button
                                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                    type={"submit"} name={"page"} value={1}
                                >First
                                </button>
                            </li>
                            <li>
                                <button
                                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                    type={"submit"} name={"page"} value={1}
                                >Prev
                                </button>
                            </li>
                            </>
                            }

                            {Array(last - first + 1).fill(0).map((_, i) => {

                                let value = first + i
                                return <li>
                                    <button
                                        className={"relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500" + `${resp.page === value && " bg-neutral-100"}`}
                                        type={"submit"} name={"page"} value={value}
                                    >{value}
                                    </button>
                                </li>
                            })}
                            {
                                last !== resp.last_page && <>
                                    <li>
                                        <button
                                            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                            type={"submit"} name={"page"} value={last + 1}
                                        >Next
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                            type={"submit"} name={"page"} value={resp.last_page}
                                        >Last
                                        </button>
                                    </li>
                                </>
                            }

                    </ul>
                </nav>
            </form>


        </main>
    );
}
