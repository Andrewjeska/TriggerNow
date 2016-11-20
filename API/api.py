from flask import Flask, request, jsonify
import requests
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from whatever import parse
import os

app = Flask(__name__)


@app.route('/api/words', methods=['POST'])
def wordDate():
    if request.method == 'POST':
        print(request.json.get("words"))
        result = parse(request.json.get("words").lower())
        print(result)
        return jsonify(emotionalState=result)



    #analyzes words


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(port)
    IOLoop.instance().start()
