import {redirect} from "next/navigation";
import SearchBar from "@/libs/components/SearchBar/SearchBar";
import DataList from "@/libs/components/DataList/DataList";
import PagingNav from "@/libs/components/PagingNav/PagingNav";

type searchParamsType = { [key: string]: string | null }
export default async function Home({searchParams}: { searchParams: searchParamsType }) {

    async function getData(searchParam?: searchParamsType) {
        "use server";

        const url = new URL("http://localhost:4882")
        Object.keys(searchParams).map((param: string) => {
            console.debug(param)
            url.searchParams.append(param, searchParams[param] as string)
        });
        let resp = await fetch(url, {cache:"no-store"});
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
        if(curPage && !page){
            url.searchParams.append("page", curPage as string);
        }else if(page){
            url.searchParams.append("page", page as string);
        }

        if(curSrchTxt===formData.get('srchTxt')as string && curPage===page){
            return false;
        }

        redirect(url.toString());

    }

    const result = await getData(searchParams);
    const {items, paging} = result;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24 h-screen">
            <form action={go} className={"w-full flex flex-col grow"}>

                <SearchBar searchText={searchParams["srchTxt"] as string}/>

                <DataList items={items}/>
                <PagingNav paging={paging} />
            </form>
        </main>
    );
}
