/**
 *
 */
export class FlexBuffer {

  private buffer!: Buffer;
  private length!: number;
  private originalArgs: any[];
  private tail!: number;

  /**
   *
   */
  constructor (...args: any[]) {
    this.originalArgs = args.length ? [ ...args ] : [0];

    this.reset();
  }

  /**
   *
   * @param start
   * @param end
   */
  delete (start: number, end: number): void {
    if (end > this.tail || start > this.tail || start < 0 || end < 0 || start > end) {
      throw new Error(`Start and end not valid. start:[${start}], end:[${end}], size:[${this.tail}]`);
    }

    this.buffer.slice(end, this.tail).copy(this.buffer, start);
    this.tail = this.tail - end + start;
  }

  /**
   *
   * @param start
   * @param end
   */
  deleteAndGet (start: number, end: number): Buffer {
    const clone: Buffer = Buffer.alloc(end - start);

    this.buffer.slice(start, end).copy(clone);
    this.delete(start, end);

    return clone;
  }

  /**
   *
   */
  getBuffer (): Buffer {
    const buffer: Buffer = this.buffer.slice(0, this.tail);
    const clone: Buffer = Buffer.alloc(buffer.length);

    buffer.copy(clone);

    return clone;
  }

  /**
   *
   */
  getBufferLength (): number {
    return this.buffer.length;
  }

  /**
   *
   */
  getBufferReference (): Buffer {
    return this.buffer.slice(0, this.tail);
  }

  /**
   *
   */
  getLength (): number {
    return this.tail;
  }

  /**
   *
   */
  reset (): void {
    const originalArgs: any[] = this.originalArgs;

    if (typeof originalArgs[0] === 'number') {
      this.buffer = Buffer.alloc(originalArgs[0]);
    } else {
      this.buffer = Buffer.from.apply(Buffer, originalArgs as [ string, (string | undefined)? ]);
    }

    this.length = this.buffer.length;
    this.rewind();
  }

  /**
   *
   * @param length
   */
  resizeBuffer (length: number): void {
    if (this.length === 0) {
      this.length = 1;
    }

    const previous: Buffer = this.buffer;
    this.length = (this.length + length) * 2;
    this.buffer = Buffer.alloc(this.length);
    previous.copy(this.buffer, 0, 0, this.tail);
  }

  /**
   *
   */
  rewind (): void {
    this.tail = 0;
  }

  /**
   *
   * @param param
   */
  write (param?: any): void {
    if (!param) {
      return;
    }

    if (!param.length) {
      param = String(param);
    }

    let length: number = param.length;
    if (typeof param === 'string') {
      length = Buffer.byteLength(param);
    }

    if (this.tail + length >= this.length) {
      this.resizeBuffer(length);
    }

    if (Buffer.isBuffer(param)) {
      param.copy(this.buffer, this.tail);
    } else {
      this.buffer.write(param, this.tail);
    }

    this.tail = this.tail + length;
  }

}
