import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { IconButton } from "./icon-button";
import { Checkbox } from "./checkbox";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { Table } from "./table/table";
import { ChangeEvent, useEffect, useState } from "react";
import { TableRow } from "./table/table-row";
import { useDebounce } from "../logic/use-debounce";
import { formatDateAgo } from "../logic/format-date-ago";
import { useUrlState } from "../logic/use-url-state";

interface Attendee{
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}

export function AttendeeList(){
    const [total, setTotal] = useState(0);
    const [attendees, setAttendees] = useState<Attendee[]>([]);

    const [page, setCurrentPage, hiddenPage] = useUrlState<number>("page", 1, (v) => Number(v));
    const [search, setCurrentSearch, hiddenSearch] = useUrlState<string>("search", "", (v) => v);

    const debounceChange = useDebounce<string>((value: string) => {
        setCurrentSearch(
            value
            .replace(/^[\s]+|[\s]+$/g, "")
        );
        setCurrentPage(1);
    }, 500);

    const maxPage = Math.ceil(total / 10);

    useEffect(() => {
        const url = new URL("http://localhost:3333/events/2197ef89-7dfc-4082-b85c-522abe26443d/attendees");

        url.searchParams.set("pageIndex", String(page - 1));

        if(search.length){
            const searchEl: any = document.getElementById("searchFilter")!;
            if(searchEl.value.replace(/[\s]/, "") === "")
                searchEl.value = search;
            url.searchParams.set("query", search);
        }else{ 
            hiddenSearch(); 
        }

        if(page === 1) hiddenPage();

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setTotal(data.totalAttendees)
            setAttendees(data.attendees)
        });
    }, [page, search]);

    function onInputChange(event: ChangeEvent<HTMLInputElement>){
        debounceChange(event.target.value);
    }
    function nextPage(){
        setCurrentPage(page + 1);
    }
    function previousPage(){
        setCurrentPage(page - 1)
    }
    function lastPage(){
        setCurrentPage(maxPage);
    }
    function firstPage(){
        setCurrentPage(1);
    } 
    return (
        <div className="flex flex-col gap-4">

            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm w-72 flex items-center gap-3">
                    <Search className="size-4 text-emerald-300"/>
                    <input 
                        onChange={onInputChange} 
                        className="bg-transparent text-sm flex-1 outline-none" 
                        placeholder="Buscar participante..."
                        id="searchFilter"
                    />
                </div>  
            </div>

            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{width: 48}}>
                            <Checkbox />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data da inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{width: 64}}></TableHeader>
                    </tr>   
                </thead>
                <tbody>
                    {attendees.length 
                    ? attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>    
                                </TableCell>    
                                <TableCell>{formatDateAgo(attendee.createdAt)}</TableCell>
                                <TableCell>
                                    {formatDateAgo(attendee.checkedInAt) || <span className="text-zinc-400">Não fez check-in</span>}
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    }) 
                    : (
                        <tr className="border-b border-white/10">
                            <td className="py-72 text-center text-xl" colSpan={6}>
                                Nenhum participante encontrado...
                            </td>
                        </tr>
                    ) }     
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando {attendees.length} de {total} itens
                        </TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-x-8">
                                <span>Página {attendees.length ? page : 0} de {maxPage}</span>
                                <div className="flex gap-x-1.5">
                                    <IconButton disabled={page === 1} onClick={firstPage}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton disabled={page === 1} onClick={previousPage}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton disabled={page >= maxPage} onClick={nextPage}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton disabled={page >= maxPage} onClick={lastPage}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>  
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>       
            </Table>  
        </div>      
    )
}