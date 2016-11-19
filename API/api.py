from flask import Flask, request
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

app = Flask(__name__)


@app.route('/api/geo', methods=['POST'])
def geoData():
    #takes a packet of lats and longs, Tim will parse
    #should return if you're in a bad area
    return 'something'


@app.route('/api/heart', methods=['POST'])
def heartRateData():
    #takes packet of lats and longs, Time will parse
    #should return if you're in a bad area
    return 'something else'


if __name__ == '__main__':
	http_server = HTTPServer(WSGIContainer(app))
	http_server.listen(80)
	IOLoop.instance().start()
