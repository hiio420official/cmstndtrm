from typing import Optional, List, TypeVar, Generic

from pydantic import Field, BaseModel

T = TypeVar("T")


class ResponseModel(BaseModel,Generic[T]):
    msg: str = Field("", description="응답메세지")
    isOk: bool = Field(True, description="응답 성공 여부")
    items: Optional[List[T] | T] = Field(None, description="응답 데이터")


class Paging(BaseModel):
    totalSize: int = Field(0, description="전체 갯수")
    totalPage: int = Field(0, description="전체 페이지 수")
    page: int = Field(1, description="현재 페이지")
    size: int = Field(10, description="출력 갯수")


class ResponseModelPaging(ResponseModel):
    paging: Paging = Field(Paging(), description="페이지 정보")
