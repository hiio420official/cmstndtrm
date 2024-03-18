"""
ExcelUtils.py
@제목: 엑셀 정보 파일
@설명: 엑셀 정보 Class 파일

    작성일자        작성자
-----------------------
    2024.03.15    hiio420

"""
from typing import List

import pandas as pd
from openpyxl.worksheet._read_only import ReadOnlyWorksheet
from pandas import ExcelFile, DataFrame

from libs.utils.FileUtils import FileUtils


class ExcelUtils(FileUtils):
    def __init__(self):
        super().__init__()
        self.xlsx_file: ExcelFile | None = None
        self.sheets: List[ReadOnlyWorksheet] | None = None
        self.sheet_names: List[str] | None = None
        self.df_dict: dict[int, DataFrame] | None = None

    def read_excel(self, file_path) -> dict[int, DataFrame]:
        self.read_file(file_path)
        self.xlsx_file = ExcelFile(file_path)
        self.sheets = self.xlsx_file.book.worksheets
        self.sheet_names = [sheet.title for sheet in self.sheets if sheet.sheet_state == "visible"]
        self.df_dict = {i: pd.read_excel(self.path, sheet_name=self.sheet_names[i]).fillna("") for i, n in
                        enumerate(self.sheet_names)}

        return self.df_dict


if __name__ == '__main__':
    excelUtils = ExcelUtils()
    excelUtils.read_excel('F:\\[01]project\\commonStandardTerm\\upload\\(붙임)공공데이터 공통표준용어(2022.7월).xlsx')
    print(excelUtils.to_dict())
