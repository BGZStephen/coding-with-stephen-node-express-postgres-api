function asyncwrap(fn) {
  return function(req, res, next) {
    return fn.call(this, req, res, next).catch(next)
  }
}

module.exports = {
  asyncwrap
}