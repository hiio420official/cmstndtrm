export type DataListItemType = { [key: string]: string }
type PropsType = {
    item: DataListItemType;
}
export default function DataListItem({item}: PropsType) {

    return <tr className="border-b border-neutral-200 dark:border-white/10">
        <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4 font-medium">{item["번호"]}</td>
        <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4">{item[Object.keys(item)[1]]}</td>
        <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4">{item[Object.keys(item)[2]]}</td>
        <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4">{item[Object.keys(item)[3]]}</td>
        <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4">{item[Object.keys(item)[4]]}</td>
    </tr>
}