from websocket import create_connection
import random, json

from crowdwiz import CrowdWiz
from crowdwiz.account import Account

with open('config.json') as json_data:
    config = json.load(json_data)


def createConnection():
    crowdwiz_node = 'wss://cwd.global/ws'
    ws = create_connection(crowdwiz_node)

    cwd = CrowdWiz(node=crowdwiz_node, keys=['5KbeT3mKBuUxFxBPwLMqtY46nvSsoJrJED92bU61TBXEng1nB2Y',
                                             '5JocyYoh7J4mepECkeDzkx7JEftsgyZzoBupLp6Yqyy9DoMJhvG'])
    bc_acc = Account(config['owner'], blockchain_instance=cwd)
    ws.send('{"jsonrpc": "2.0", "method": "get_objects" "params": [["%s"]], "id": 1}' % bc_acc[
        'statistics'])
    ws.recv()

    return [cwd, bc_acc]


def generateCode():
    return str(random.randint(111111, 999999))


def sendCode(mess: str, recipient: str):
    response = createConnection()[0].send_message(recipient, mess, account=config['owner'])
    return response['operations'][0][1]['to'].split('.')[2]


def checkSubs(max_op):
    res = []
    for h in createConnection()[1].history():
        if h['op'][0] == 0 and int(h['id'].split('.')[2]) > int(max_op) and h['op'][1]['to'].split('.')[2] == config[
            'owner_id']:
            res.append(
                {"buyer": h['op'][1]['from'].split('.')[2],
                 "amount": str(int(h['op'][1]['amount']['amount']) / 100000)})
            max_op = h['id'].split('.')[2]
    return [res, str(max_op)]
