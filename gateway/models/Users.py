from flask_mongoengine import MongoEngine

db = MongoEngine()
# email, password, telegram, phone, blockchainAccount, blockchainId, subscriptions, role



class Users(db.Document):
    email = db.StringField()
    password = db.StringField()
    telegram = db.StringField()
    phone = db.StringField()
    blockchainAccount = db.StringField()
    blockchainId = db.StringField()
    subscriptions = db.ListField()
    role = db.StringField()


