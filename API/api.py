from flask import Flask, request, jsonify
import requests
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
import os

app = Flask(__name__)


@app.route('/api/words', methods=['POST'])
def wordDate():
    if request.method == 'POST':
        print(request.json.get("words"))
        return jsonify(emotionalState='good')



    #analyzes words


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(port)
    IOLoop.instance().start()
