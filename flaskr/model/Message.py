class Message:
    
    def __init__(self, data):
        self.messageId = data['messageId'] #the unique message id.
        self.title = data['title']
        self.sourceId = data['senderId'] #email address of user that is sending message
        self.destId = data['recieverId'] #email address of user that is recieving the message.
        self.content = data['data'] #the actual message data
        