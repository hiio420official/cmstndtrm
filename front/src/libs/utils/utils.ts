import {PagingType} from "./utils.d"

export class Paging {

    pagingSize: number = 10;
    curPagingSize: number = 10;
    curFirstPage: number = 1;
    curLastPage: number = 0;
    curPrevPage: number = 0;
    curNextPage: number = 0;
    lastPage: number = 0;
    curPrevPageOk: boolean = false;
    curNextPageOk: boolean = false;

    constructor(paging: PagingType) {
        this.pagingSize = paging?.pagingSize || this.pagingSize;
        this.curFirstPage = this.getCurFirstPage(paging.page);
        this.curLastPage = this.getCurLastPage(paging.page, paging.totalPage);
        this.curPagingSize = this.curLastPage - this.curFirstPage + 1;
        this.curPrevPage = paging.page - 1;
        this.curNextPage = paging.page + 1;
        this.curPrevPageOk = 0 <= this.curPrevPage;
        this.curNextPageOk =this.curNextPage < paging.totalPage;
        this.lastPage = paging.totalPage;
    }

    getCurLastPage(page: number, totalPage: number): number {
        let curLp: number = this.getCurFirstPage(page) + (this.pagingSize - 1);
        return curLp >= totalPage ? totalPage : curLp;
    }

    getCurFirstPage(page: number): number {
        return Math.floor((page - 1) / this.pagingSize) * this.pagingSize + 1;
    }
}