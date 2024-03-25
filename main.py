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

from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from libs import ExcelUtils

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


@app.get("/")
def read_root(data_id: int = 0, page: int = 1, limit: int = 10, srchTxt: str = ""):
    if page < 1:
        page = 0
    if limit < 10:
        limit = 10
    df = df_dict[data_id]
    df = df[df.apply(lambda row: row.astype(str).str.contains(srchTxt, case=False).any(), axis=1)]
    print(df)
    first_idx = (page - 1) * limit
    last_idx = first_idx + limit - 1
    total_size = df.shape[0]
    first_page = 1
    last_page = math.ceil(total_size / limit)

    df_sliced = df[first_idx:last_idx + 1].copy()

    df_sliced["번호"] = [i for i in
                       range(total_size - (page - 1) * limit, total_size - (page - 1) * limit - df_sliced.shape[0], -1)]
    data = []
    if df_sliced.shape[0] != 0:
        data = df_sliced.to_dict("records")

    return {"sheetName": excel_utils.sheet_names[data_id], "data_id": data_id, "page": page, "limit": limit,
            "first_page": first_page, "last_page": last_page, "firstIdx": first_idx, "lastIdx": last_idx,
            "totalSize": total_size, "srchTxt": srchTxt,
            "data": data}
