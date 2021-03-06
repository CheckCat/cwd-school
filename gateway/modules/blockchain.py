from websocket import create_connection
import random, json

from crowdwiz import CrowdWiz
from crowdwiz.account import Account

with open('config.json') as json_data:
    config = json.load(json_data)


def createConnection(count):
    try:
        crowdwiz_node = 'wss://backup.cwd.global/ws'
        ws = create_connection(crowdwiz_node)

        cwd = CrowdWiz(node=crowdwiz_node, keys=['5K7oew6HiCQeCKY1JmrbM8FVQ5pTG92zBDtB8tdESVdbgREj6nN',
                                                 '5KGY2kxQS4MywSJw8YcG9HDPC8ZUv5o9RrYabGNeq4QhvzNrv1C'])
        bc_acc = Account(config['owner'], blockchain_instance=cwd)
        ws.send('{"jsonrpc": "2.0", "method": "get_objects" "params": [["%s"]], "id": 1}' % bc_acc[
            'statistics'])
        ws.recv()
        ws.close()
        return [cwd, bc_acc]
    except Exception as exc:
        print(exc)
        if(count>=10):
            return [False]
        return createConnection(count+1)

def generateCode():
    return str(random.randint(111111, 999999))

cwd = createConnection(1)[0]
print(cwd == False) # Если в консоль выводится False - то все впорядке. Если выводится True, то при регистрации будет выходить ошибка.
                    # Следует добиться вывода False
def sendCode(mess: str, recipient: str):
    try:
        if(cwd == False):
            return False
        response = cwd.send_message(recipient, mess, account=config['owner'])
        return response['operations'][0][1]['to'].split('.')[2]
    except:
        return True

def checkSubs(max_op):
    res = []
    data = createConnection(1)[1]
    for h in data.history():
        if h['op'][0] == 0 and int(h['id'].split('.')[2]) > int(max_op) and h['op'][1]['to'].split('.')[2] == config[
            'owner_id']:
            res.append(
                {"buyer": h['op'][1]['from'].split('.')[2],
                 "amount": str(int(h['op'][1]['amount']['amount']) / 100000)})
            max_op = h['id'].split('.')[2]
    return [res, str(max_op)]
