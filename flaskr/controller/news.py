from flask import Flask, request, jsonify, render_template, Blueprint
# from model import News # figure out how to fix this for the news article_info fields
from flask_cors import CORS
from newsapi.newsapi_client import NewsApiClient
import json

news_page = Blueprint('news_page', __name__,  template_folder='templates' )

@news_page.route('/home', methods=['GET'])
def get_news():

    # with app.app_context():
        newsapi = NewsApiClient(api_key = '29b0d1fda8b6452fb4df7d86a3dc5b9a')
        data = newsapi.get_everything(q='health and fitness', language='en', page_size=20)
        articles = data['articles']
        # print(type(articles[0])) It showed that it is of dict type.
        articles_json = json.dumps(articles)
        return articles_json



# # if __name__ == '__main__':
# #     news_page.run(debug=True)
#
#
#
#
#
#
#
#
#
#
#
#     # source = []
#     # title = []
#     # author = []
#     # link = []
#     # image = []
#     # date = []
#     # content = []
#     # print(type(articles))
#     # print(type(articles[0]))
#     # print(articles[0])
#     # for entry in range(len(articles)):
#     #     news_entry = articles[entry]
#     #     source.append(news_entry['source']['name'])
#     #     title.append(news_entry['title'])
#     #     author.append(news_entry['author'])
#     #     link.append(news_entry['url'])
#     #     image.append(news_entry['urlToImage'])
#     #     date.append(news_entry['publishedAt'])
#     #     content.append(news_entry['content'])
#     # print(source[0])
#     # combination = zip(source,title,author,link, image, date, content)
#     # return combination
#
# # This is how to fetch the source from the JSON
# # articles = data['articles']
# # source = articles[0]
# # print(source['source']['name'])
#
# # Thw following line also accomplishes the same thing
# # print(data['articles'][0]['source']['name'])
# # print(get_news())