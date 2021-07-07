from flask_mongoengine import MongoEngine

db = MongoEngine()

class Users(db.Document):
    password = db.StringField()
    telegram = db.StringField()
    blockchainAccount = db.StringField()
    blockchainId = db.StringField()
    subscriptions = db.ListField()
    role = db.StringField()
    isThanks = db.BooleanField()
    theme = db.StringField()


