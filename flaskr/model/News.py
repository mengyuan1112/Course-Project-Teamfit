class News:
    
    def __init__(self, article_info):
        self.articleId = article_info['articleId'] # The the ith article number 
        self.title = article_info['title'] 
        self.source = article_info['source'] # News soucrce article is coming from.
        self.author = article_info['author'] # Name of writer.
        self.date = article_info['date'] # Date of posting
        self.content = article_info['content'] # The actual content. 

