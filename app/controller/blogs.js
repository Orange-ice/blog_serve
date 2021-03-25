'use strict';

const Controller = require('egg').Controller

class BlogController extends Controller {
  async list() {
    const { ctx, app } = this
    const Op = app.Sequelize.Op
    const { limit, page, title } = ctx.request.body
    const { count, rows } = await ctx.model.Blog.findAndCountAll({
      limit: limit,
      offset: limit * (page - 1),
      where: {
        title: {
          [Op.substring]: `${title}`
        }
      },
      attributes: { exclude: 'user' },
      include: { model: app.model.User, attributes: {exclude: 'password'} }
    })
    ctx.body = { status: 'ok', msg: '查询成功', data: { blogs: rows, total: count } }
  }

  async show() {
    const { ctx,app } = this
    const blogId = ctx.request.url.slice(6)
    const blog = await ctx.model.Blog.findByPk(ctx.helper.toInt(blogId), {
      attributes: { exclude: 'user' },
      include: { model: app.model.User, attributes: {exclude: 'password'} }
    })
    if (!blog) {
      ctx.status = 403
      ctx.body = { status: 'fail', msg: '博客不存在' }
      return
    }
    ctx.body = { status: 'ok', msg: '查询成功', data: blog }
  }

  async create() {
    const { ctx, app } = this
    const { title, content } = ctx.request.body
    console.log('博客创建', title, content)
    console.log(ctx.state.user)
    const [blog, created] = await ctx.model.Blog.findOrCreate({
      where: { title },
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

  async update() {
    const { ctx } = this
    const blogId = ctx.request.url.slice(6)
    const { title, content } = ctx.request.body
    const flag = await ctx.model.Blog.findOne({
      where: { title }
    })
    if (!!flag && flag.id !== ctx.helper.toInt(blogId)) {
      ctx.status = 403
      ctx.body = { status: 'fail', msg: '博客名已存在' }
      return
    }
    const blog = await ctx.model.Blog.findByPk(ctx.helper.toInt(blogId))
    await blog.update({ title, content })
    ctx.body = { status: 'ok', msg: '修改成功', data: blog }
  }

  async destroy () {
    const { ctx } = this
    const blogId = ctx.request.url.slice(6)
    const blog = await ctx.model.Blog.findByPk(ctx.helper.toInt(blogId))
    if (!blog) {
      ctx.status = 403
      ctx.body = { status: 'fail', msg: '博客不存在' }
      return
    }
    await blog.destroy()
    ctx.body = { status: 'ok', msg: '删除成功' }
  }
}

module.exports = BlogController
