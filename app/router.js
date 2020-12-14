'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  console.log(app.config.env)
  router.get('/', controller.home.index);

  router.post('/auth/register', controller.users.register)
  router.post('/auth/login', controller.users.login)
  router.get('/user/:id', controller.users.show)
};
