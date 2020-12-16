const { assert, app } = require('egg-mock/bootstrap')

describe('test/app/controller/users.test.js', () => {
  describe('POST/auth/register', () => {
    it('首次注册提示成功', async() => {
      const res = await app.httpRequest().post('/auth/register').send({
        username: 'burt',
        password: '123456'
      })
      assert(res.status === 200)
      assert(res.body.status === 'ok')
      assert(res.body.data.username === 'burt')
    })

    it('使用相同的用户名注册提示失败', async () => {
      await app.httpRequest().post('/auth/register').send({
        username: 'burt1',
        password: '123456'
      })
      const res = await app.httpRequest().post('/auth/register').send({
        username: 'burt1',
        password: '123456'
      })
      assert(res.status === 200)
      assert(res.body.status === 'fail')
    })
  })
})
