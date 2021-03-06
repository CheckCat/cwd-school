import json
from flask_mongoengine import MongoEngine
from flask import Flask, make_response, request
from flask_cors import CORS

from modules import generateCode, sendCode, checkSubs
from models import Users

with open('config.json') as json_data:
    config = json.load(json_data)

app = Flask(__name__)
app.config["MONGODB_HOST"] = config['mongoUri']

cors = CORS(app, origins = [config['baseUrl']])

db = MongoEngine()
db.init_app(app)

candidates = {}

@app.route('/python/api/create_code', methods=['POST'])
def createCode():
    data = request.json

    try:
        user = Users.objects(blockchainAccount=data['blockchainAccount']).first()

        if (data['isForgot']):
            if (user == None):
                return make_response({"message": "Такого пользователя не существует!"}, 400)
        else:
            if (user != None):
                return make_response({"message": "Такой пользователь уже существует!"}, 400)
        candidates[data['blockchainAccount']] = {}
        candidate = candidates[data['blockchainAccount']]
        candidate['code'] = generateCode()
        bc_id = sendCode(candidate['code'], data['blockchainAccount'])

        if(bc_id == False):
            return make_response({"message": "Что-то пошло не так, попробуйте еще раз!"}, 400)
        if(bc_id == True):
            return make_response({"message": "Такого аккаунта не существует!"}, 400)
        candidate['bc_id'] = bc_id
        return make_response({"ok": True}, 200)
    except:
        return make_response({"message": "Что-то пошло не так"}, 400)



@app.route('/python/api/verify_code', methods=['POST'])
def veryfiCode():
    data = request.json
    try:
        if candidates[data['blockchainAccount']]['code'] != data['code']:
            return make_response({"message": "Неправильно введен код"}, 412)
        bc_id = candidates[data['blockchainAccount']]['bc_id']
        del candidates[data['blockchainAccount']]
        return make_response({'bc_id': bc_id}, 200)
    except:
        return make_response({"message": "Что-то пошло не так!"}, 500)


@app.route('/python/api/get_subscriptions', methods=['POST'])
def getSubs():
    data = request.json
    try:
        arr, max_op = checkSubs(data['max_op'])
        return make_response({"subscriptions": arr, "max_op": max_op}, 200)
    except:
        return make_response({"message": "Что-то пошло не так!"}, 500)


if __name__ == '__main__':
    from waitress import serve
    print('Flask-сервер был запущен...')
    serve(app, host=config['host'], port=config['port'])
