declare module 'flexbuffer2';

/**
 *
 */
export class FlexBuffer {

  /**
   * Allocates a new buffer containing the given {str}.
   *
   * @param str String to store in buffer.
   * @param encoding encoding to use, optional.  Default is 'utf8'
   */
  constructor (str: string, encoding?: string);

  /**
   * Allocates a new buffer
   *
   * @param arg
   */
  constructor (arg: number | Uint8Array | ArrayBuffer | SharedArrayBuffer | any[] | Buffer);

  /**
   *
   * @param start
   * @param end
   */
  delete (start: number, end: number): void;

  /**
   *
   * @param start
   * @param end
   */
  deleteAndGet (start: number, end: number): Buffer;

  /**
   *
   */
  getBuffer (): Buffer;

  /**
   *
   */
  getBufferLength (): number;

  /**
   *
   */
  getBufferReference (): Buffer;

  /**
   *
   */
  getLength (): number;

  /**
   *
   */
  reset (): void;

  /**
   *
   * @param length
   */
  resizeBuffer (length: number): void;

  /**
   *
   */
  rewind (): void;

  /**
   *
   * @param param
   */
  write (param?: any): void;

}
