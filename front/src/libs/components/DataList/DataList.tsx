"use client";
import DataListItem, {DataListItemType} from "@/libs/components/DataList/DataListItem";
import {usePathname,  useSearchParams,useRouter} from "next/navigation";
import {Suspense} from "react";


type PropsType = {
    items?: DataListItemType[]
}

export default function DataList({items}:PropsType) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    console.log(current)
    function SearchBarFallback() {
        return <>placeholder</>
    }
    return <div className={"grow"}>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 grow-1">
                <div className="overflow-hidden">
                    <table
                        className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                        <thead
                            className="border-b border-neutral-200 font-medium dark:border-white/10">
                        <tr>
                            <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4" >번호</th>
                            <Suspense fallback={<SearchBarFallback />}>
                                <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4  cursor-pointer" onClick={()=>{
                                    current.set("order","1")
                                    console.log(current)
                                router.push(pathname+"?"+current.toString())
                            }}>차수</th>
                            </Suspense>
                            <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4">단어</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4">설명</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4">비고</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items?.map((item: { [key: string]: string }) => {
                            return <DataListItem item={item} key={Math.random()}/>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}