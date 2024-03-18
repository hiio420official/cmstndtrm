"""
FileUtils.py
@제목: 파일 정보 파일
@설명: 파일 정보를 읽어오는 Class 파일

    작성일자        작성자
-----------------------
    2024.03.15    hiio420

"""
import os
import pathlib
from datetime import datetime
import json
from typing import Any


class FileUtils:

    def __init__(self):
        self.filename: str | None = None
        self.path: str | None = None
        self.ext: str | None = None
        self.size: int | None = None
        self.size_unit: str | None = None
        self.access_dt: datetime | None = None
        self.created_dt: datetime | None = None
        self.modified_dt: datetime | None = None

    def read_file(self, path):
        self.path = path
        self.size = os.path.getsize(path)
        self.size_unit = self.calc_size_unit(self.size)
        self.access_dt = datetime.fromtimestamp(os.path.getatime(path))
        self.created_dt = datetime.fromtimestamp(os.path.getctime(path))
        self.modified_dt = datetime.fromtimestamp(os.path.getmtime(path))
        self.ext = pathlib.Path(path).suffix
        self.filename = pathlib.Path(path).stem

    def to_json(self) -> Any:
        return json.dumps(self.__dict__, default=str, indent=4)

    def to_dict(self) -> dict[str,Any]:
        return self.__dict__

    @staticmethod
    def calc_size_unit(size) -> str:
        byte_units = ["Bytes", "KB", "MB", "GB", "TB"]
        size_unit = ""
        for unit in byte_units:
            if size < 1024.0:
                size_unit = f"{round(size, 2)} {unit}"
                break
            else:
                size /= 1024.0
        return size_unit


if __name__ == '__main__':
    fileUtil = FileUtils()
    fileUtil.read_file('F:\\[01]project\\commonStandardTerm\\upload\\(붙임)공공데이터 공통표준용어(2022.7월).xlsx')
    print(fileUtil.to_dict())
