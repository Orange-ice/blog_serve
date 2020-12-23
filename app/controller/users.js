const Controller = require('egg').Controller
const shajs = require('sha.js')
const hash = raw => shajs('sha256').update(raw).digest('hex')

function toInt(str) {
  if(typeof str === 'number') return str
  if(!str) return str
  return parseInt(str, 10) || 0
}

class UserController extends Controller {
  async show() {
    const ctx = this.ctx
    console.log(ctx.state.user)
    if(ctx.state.user.iat + 10 < Date().now/1000){
      ctx.body = { status: 'fail', msg: 'token已过期' }
      return
    }
    let user = await ctx.model.User.findByPk(toInt(ctx.state.user.id), {attributes: {exclude: 'password'}})
    if(!user) {
      ctx.body = { status: 'fail', msg: '用户不存在' }
      return
    }
    ctx.body = { status: 'ok', msg: '查找成功', data: user }
  }

  async register() {
    const {ctx, app} = this
    const { username, password } = ctx.request.body
    console.log('登录测试', username, password)
    const [user, created] = await ctx.model.User.findOrCreate({
      where: { username },
      attributes: { exclude: 'password' },
      defaults: {
        password,
        avatar: `https://avatars.dicebear.com/api/human/${username}.svg?mood[]=happy`
      }
    })
    if(created) {
      const token = app.jwt.sign({
        username,
        id: user.id,
        exp: Date.now() + 1000*3600*24*7
      }, app.config.jwt.secret)
      ctx.body = { status: 'ok', msg: '注册成功', data: user, token }
      return
    }
    ctx.body = { status: 'fail', msg: '用户已存在' }
  }

  async login() {
    const {ctx, app} = this
    const { username, password } = ctx.request.body
    const user = await ctx.model.User.findOne({
      where: { username, password: hash(password) },
      attributes: { exclude: ['password'] }
    })
    if(!user){
      ctx.body = { status: 'fail', msg: '用户不存在或者密码不正确' }
      return
    }
    const token = app.jwt.sign({
      username,
      id: user.id,
      exp: Date.now() + 1000*3600*24*7
    }, app.config.jwt.secret)
    ctx.body = { status: 'ok', msg: '登录成功', data:user, token }
  }

  async destory() {
    const ctx = this.ctx
    const id = toInt(ctx.params.id)
    const user = await ctx.model.User.findByPk(id)
    if(!user){
      ctx.body = { status: 'fail', msg: '用户不存在' }
      return
    }
    await user.destroy()
    ctx.body = { status: 'ok', msg: '用户已删除' }
  }
}

module.exports = UserController
