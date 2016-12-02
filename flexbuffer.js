'use strict'

// utility method
const checkParams = (start, end, size) => {
  if (end > size || start > size || start < 0 || end < 0 || start > end) {
    throw new Error(`Start and end not valid. start:[${start}], end:[${end}], size:[${size}]`)
  }
}

// main-class
class FlexBuffer {
  constructor () {
    // remember original args
    const argsLength = arguments.length
    const originalArgs = new Array(argsLength)
    for (let i = 0; i < argsLength; ++i) {
      originalArgs[i] = arguments[i]
    }

    // by default will create zero-length buffer
    if (argsLength === 0) {
      originalArgs[0] = 0
    }

    this.originalArgs = originalArgs

    // init first buffer
    this.reset()
  }

  rewind () {
    this.tail = 0
  }

  reset () {
    const originalArgs = this.originalArgs
    if (typeof originalArgs[0] === 'number') {
      this.buffer = Buffer.allocUnsafe(originalArgs[0])
    } else {
      this.buffer = Buffer.from.apply(Buffer, originalArgs)
    }

    this.length = this.buffer.length
    this.tail = 0
  }

  resizeBuffer (minLen) {
    if (this.length === 0) {
      this.length = 1
    }

    this.length = (this.length + minLen) * 2
    const oldBuffer = this.buffer
    this.buffer = Buffer.allocUnsafe(this.length)
    oldBuffer.copy(this.buffer, 0, 0, this.tail)
  }

  write (arg) {
    if (!arg) {
      return
    }

    if (!arg.length) {
      arg = String(arg)
    }

    let len
    if (typeof arg === 'string') {
      len = Buffer.byteLength(arg)
    } else {
      len = arg.length
    }

    if (this.tail + len >= this.length) {
      this.resizeBuffer(len)
    }

    if (Buffer.isBuffer(arg)) {
      arg.copy(this.buffer, this.tail)
    } else {
      this.buffer.write(arg, this.tail)
    }

    this.tail += len
  }

  getBufferReference () {
    return this.buffer.slice(0, this.tail)
  }

  getBuffer () {
    const buff = this.buffer.slice(0, this.tail)
    const b = Buffer.allocUnsafe(buff.length)
    buff.copy(b)
    return b
  }

  delete (start, end) {
    checkParams(start, end, this.tail)
    this.buffer.slice(end, this.tail).copy(this.buffer, start)
    this.tail = this.tail - end + start
  }

  deleteAndGet (start, end) {
    const b = Buffer.allocUnsafe(end - start)
    this.buffer.slice(start, end).copy(b)
    this.delete(start, end)
    return b
  }

  getLength () {
    return this.tail
  }

  getBufferLength () {
    return this.buffer.length
  }

}

exports.FlexBuffer = FlexBuffer
