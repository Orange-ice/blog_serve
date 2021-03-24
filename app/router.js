'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  console.log(app.config.env)

  router.get('/', controller.home.index);
  router.post('/auth/register', controller.users.register)
  router.post('/auth/login', controller.users.login)
  // 查询用户信息，及博客信息
  router.get('/auth', jwt, controller.users.show)

  // 创建博客
  router.post('/blog', jwt, controller.blogs.create)
  // 获取所有博客
  router.get('/blog', jwt, controller.blogs.list)
  // 查看某一篇博客
  router.get('/blog/:blogId', jwt, controller.blogs.show)
  // 修改博客内容
  router.patch('/blog/:blogId', jwt, controller.blogs.update)
};
