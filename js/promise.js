class MyPromise {
  constructor(cb) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.callbackList = []

    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)

    try {
      cb(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    if (this.status !== 'pending') return
    this.status = 'fulfilled'
    this.res = value
  }

  reject(err) {
    if (this.status !== 'pending') return
    this.status = 'rejected'
    this.reason = err
  }

  then(onFulfilled, onRejected) {
    let promise = new MyPromise((r, e) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            const val = onFulfilled(this.value)
            val && r(val)
          } catch (error) {
            e(error)
          }
        })
      }

      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            const val = onRejected(this.value)
            val && r(val)
          } catch (error) {
            e(error)
          }
        })
      }

      if (this.status === 'pending') {
        this.callbackList.push({
          map: {
            fulfilled: (val) => onFulfilled(val),
            rejected: (val) => onRejected(val)
          },
          fn: () => {}
        })
      }
    })

    console.log(this === promise)

    return promise
  }

  catch(onRejected) {
    if (this.status === 'rejected') {
      onRejected(this.reason)
    }
  }
}

new MyPromise((res, rej) => {
  console.log('1')
  res(1111)
})
  .then((v) => {
    console.log('2')
    console.log(v)
    setTimeout(() => {
      return 789
    }, 1000)
  })
  .then((d) => {
    console.log('啦啦啦')
    console.log(d)
  })

console.log('ddd')
