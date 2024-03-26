"""
main.py
@제목: 메인 실행 파일
@설명: 메인 실행 파일

    작성일자        작성자
-----------------------
    2024.03.14    hiio420

"""
import math
import os.path
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from libs import ExcelUtils
from models import ResponseModel, ResponseModelPaging, Paging

# 엑셀 파일 불러오기

CUR_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_DIR = os.path.join(CUR_DIR, 'upload')
file_path = os.path.join(UPLOAD_DIR, '(붙임)공공데이터 공통표준용어(2022.7월).xlsx')

excel_utils = ExcelUtils()
df_dict = excel_utils.read_excel(file_path)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    data_id: int = 0
    page: int = 1
    limit: int = 10


@app.get("/", response_model=ResponseModelPaging[dict])
def read_root(dataId: Optional[int] = 0, page: Optional[int] = 1, limit: Optional[int] = 10,
              srchTxt: Optional[str] = ""):
    try:
        if page < 1:
            page = 1
        if limit < 10:
            limit = 10
        df = df_dict[dataId]
        df = df[df.apply(lambda row: row.astype(str).str.contains(srchTxt, case=False).any(), axis=1)]

        first_idx = (page - 1) * limit
        last_idx = first_idx + limit - 1
        total_size = df.shape[0]
        last_page = math.ceil(total_size / limit)

        df_sliced = df[first_idx:last_idx + 1].copy()

        df_sliced["번호"] = [i for i in
                           range(total_size - (page - 1) * limit, total_size - (page - 1) * limit - df_sliced.shape[0],
                                 -1)]
        data = []
        if df_sliced.shape[0] != 0:
            data = df_sliced.to_dict("records")
        paging = Paging(page=page, size=limit, totalPage=last_page, totalSize=total_size)
        resp = ResponseModelPaging(items=data, paging=paging)
    except Exception as e:
        resp = ResponseModelPaging(isOk=False, msg=str(e))

    return resp
