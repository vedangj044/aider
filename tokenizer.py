from PIL import Image
import pytesseract
import sys
from pdf2image import convert_from_path
import os

class reader():
    def __init__(self, file):
        self.file = file
        self.pages = convert_from_path(self.file, 500)
        self.image_counter = 1
        for self.page in self.pages:
            self.filename = "page_"+str(self.image_counter)+".jpg"

            self.page.save(self.filename, 'JPEG')
            self.image_counter = self.image_counter + 1

        self.filelimit = self.image_counter-1

        self.full_text = ""
        for i in range(1, self.filelimit + 1):
            self.filename = "page_"+str(i)+".jpg"
            self.text = str(((pytesseract.image_to_string(Image.open(self.filename)))))
            self.text = self.text.replace('-\n', '')
            self.full_text+=self.text


class extractor():

    def __init__(self, output_txt_file):
        self.output_txt_file = output_txt_file
        self.open_file = self.output_txt_file.split("\n")
        self.list_of_index = []
        self.index_count = 0
        self.read_lines_of_txt = self.open_file

        for i in self.read_lines_of_txt:
            if 'unit' in i.lower():
                self.list_of_index.append(self.index_count)
            self.index_count+=1

        self.list_of_topics()

    def list_of_topics(self):
        self.list_of_topic = []
        self.final_list = []
        for i in range(0, len(self.list_of_index)-1):
            self.temp_string = ""
            for j in self.read_lines_of_txt[self.list_of_index[i]+1:self.list_of_index[i+1]]:
                if j == '\n':
                    continue
                self.temp_string+=j.replace('\n', '')
            self.list_of_topic.append(self.temp_string)

        for i in self.list_of_topic:
            if i == "":
                continue
            self.final_list.append(i)

        return self.final_list

# print(extractor(reader("ds1.pdf").full_text).final_list)
