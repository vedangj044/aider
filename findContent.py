from pytrends.request import TrendReq
from youtubesearchpython import SearchVideos
import wikipediaapi

class getContent():
    def __init__(self, topic):
        self.topic = topic
        self.pyt = TrendReq()

        self.wiki_pyt = self.pyt.build_payload(kw_list=[self.topic + " wikipedia"])
        self.int_text = self.pyt.interest_over_time()

        self.yout_pyt = self.pyt.build_payload(kw_list=[self.topic + " youtube"])
        self.int_yout = self.pyt.interest_over_time()

        self.wiki = wikipediaapi.Wikipedia('en')
        self.youtube_link = SearchVideos(self.topic , offset = 1, mode ="json", max_results=5)

        self.isVideo = False

        if len(self.int_text) == 0 or len(self.int_yout) == 0:
            if self.wiki.page(self.topic).exists():
                self.summary = self.wiki.page(self.topic).summary
                self.isVideo = False
            else:
                self.link = eval(self.youtube_link.result())["search_result"][0]["link"]
                self.summary = self.link
                self.isVideo = True
        else:
            if float(self.int_text.mean()) > float(self.int_yout.mean()):
                if self.wiki.page(self.topic).exists():
                    self.summary = self.wiki.page(self.topic).summary
                    self.isVideo = False
            else:
                self.link = eval(self.youtube_link.result())["search_result"][0]["link"]
                self.summary = self.link
                self.isVideo = True
