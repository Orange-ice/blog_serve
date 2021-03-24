module.exports = (options, app) => {
  return async function (ctx, next) {
    const whiteRouter = app.config.whiteRouter
    const url = ctx.url
    // 判断当前路由是否需要验证 token
    const flag = whiteRouter.includes(url)
    if (!flag) {
      let token = ctx.header.authorization || ''
      token = token.substring(7)
      try{
        const user = await app.jwt.verify(token, app.config.jwt.secret)
        await next()
      }catch (error) {
        ctx.status = 401
        ctx.body = { status: 'fail', msg: 'token失效' }
      }
    } else {
      await next()
    }
  }
}
