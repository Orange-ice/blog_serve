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

  describe('POST/auth/login', () => {
    it('用户存在且登录成功', async () => {
      await app.httpRequest().post('/auth/register').send({username: 'burt',password: '123456'})
      const res = await app.httpRequest().post('/auth/login').send({
        username: 'burt',
        password: '123456'
      })
      assert(res.status === 200)
      assert(res.body.status === 'ok')
      assert(res.body.data.username === 'burt')
    })

    it('用户不存在', async () => {
      const res = await app.httpRequest().post('/auth/login').send({
        username: 'abcd',
        password: '123456'
      })
      assert(res.status === 200)
      assert(res.body.status === 'fail')
    })

    it('密码错误', async () => {
      await app.httpRequest().post('/auth/register').send({username: 'burt',password: '123456'})
      const res = await app.httpRequest().post('/auth/login').send({
        username: 'burt',
        password: '6666666'
      })
      assert(res.status === 200)
      assert(res.body.status === 'fail')
    })

  })

  describe('GET/ser/:id', () => {
    it('获取用户信息',async () => {
      const res1 = await app.httpRequest().post('/auth/register').send({
        username: 'burt',
        password: '123456'
      })
      let res2 = await app.httpRequest().get(`/user/${res1.body.data.id}`)
      assert(res2.status === 200)
      assert(res2.body.status === 'ok')
      assert(res1.body.data.username === res2.body.data.username)
    })
  })

})
