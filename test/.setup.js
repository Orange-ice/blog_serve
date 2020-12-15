const { app } = require('egg-mock/bootstrap')

afterEach(async () => {
  // clear database after each test case
  await  Promise.all([
    app.model.User.destory( {truncate:true, force: true} )
  ])
})
