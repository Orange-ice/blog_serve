'use strict';

const Controller = require('egg').Controller

class BlogController extends Controller {
  async list() {
    const { ctx, app } = this
    const { limit, page, title } = ctx.request.body
  }
  async detail() {}
  async create() {
    const { ctx, app } = this
    // if(ctx.state.user.iat + 10 < Date().now/1000){
    //   ctx.body = { status: 'fail', msg: 'token已过期' }
    //   return
    // }
    const { title, content } = ctx.request.body
    console.log('博客创建', title, content)
    console.log(ctx.state.user)
    const [blog, created] = await ctx.model.Blog.findOrCreate({
      where: { title },
      // attributes: { exclude: 'content' },
      defaults: {
        content,
        user: ctx.state.user.id
      }
    })
    if(created) {
      ctx.body = { status: 'ok', msg: '创建成功', data: blog }
      return
    }
    ctx.body = { status: 'fail', msg: '文章标题已存在' }
  }
  async update() {}
  async delete () {}
}

module.exports = BlogController
