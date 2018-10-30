from aiohttp import web
from captcha import ValidCodeImg
routes = web.RouteTableDef()


def generateCaptcha():
    return


@routes.get('/')
async def hello(request):
    img = ValidCodeImg()
    data, valid_str = img.getValidCodeImg()
    return web.Response(content_type="image/png", body=data)


app = web.Application()
app.add_routes(routes)
web.run_app(app, port=8090)