import { FlexBuffer } from '../flexbuffer';

describe('tests', (): void => {

  it('write empty', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write();

    expect(flexbuffer.getBufferReference().length).toEqual(0);
  });

  it('simple write string', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');

    expect(flexbuffer.getBufferReference().length).toEqual(3);
    expect(flexbuffer.getBufferReference().toString()).toEqual('aaa');
  });

  it('varios write string', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.write('ccc');

    expect(flexbuffer.getBufferReference().length).toEqual(9);
    expect(flexbuffer.getBufferReference().toString()).toEqual('aaabbbccc');
  });

  it('varios write buffer', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write(Buffer.from('aaa'));
    flexbuffer.write(Buffer.from('bbb'));
    flexbuffer.write(Buffer.from('ccc'));

    expect(flexbuffer.getBufferReference().length).toEqual(9);
    expect(flexbuffer.getBufferReference().toString()).toEqual('aaabbbccc');
  });

  it('write number', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write(4545);
    flexbuffer.write(5656);

    expect(flexbuffer.getBufferReference().length).toEqual(8);
    expect(flexbuffer.getBufferReference().toString()).toEqual('45455656');
  });

  it('reset', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.write('ccc');
    flexbuffer.reset();

    expect(flexbuffer.getBufferReference().length).toEqual(0);
  });

  it('rewind', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.write('ccc');
    flexbuffer.rewind();

    expect(flexbuffer.getBufferReference().length).toEqual(0);
  });

  it('resizeBuffer de mas bytes', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.write('ccc');
    flexbuffer.resizeBuffer(60);

    expect(flexbuffer.getBufferReference().length).toEqual(9);
    expect(flexbuffer.getBufferReference().toString()).toEqual('aaabbbccc');
  });

  it('resizeBuffer menor al length', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.resizeBuffer(2);

    expect(flexbuffer.getBufferReference().length).toEqual(6);

    flexbuffer.write('ccc');

    expect(flexbuffer.getBufferReference().toString()).toEqual('aaabbbccc');
  });

  it('getBuffer', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');

    expect(flexbuffer.getBuffer().length).toEqual(6);
    expect(flexbuffer.getBuffer().toString()).toEqual('aaabbb');
  });

  it('getBufferReference', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');

    expect(flexbuffer.getBufferReference().length).toEqual(6);
    expect(flexbuffer.getBufferReference().toString()).toEqual('aaabbb');
  });

  it('getBufferReference validacion de referencia', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.getBufferReference().write('c', 0);

    expect(flexbuffer.getBufferReference().toString()).toEqual('caabbb');
  });

  it('getBuffer validacion de copia', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.getBuffer().write('c', 0);

    expect(flexbuffer.getBufferReference().toString()).toEqual('aaabbb');
  });

  it('getBuffer equal getBufferReference', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');

    expect(flexbuffer.getBuffer().toString()).toEqual(flexbuffer.getBufferReference().toString());
  });

  it('delete un caracter', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.delete(0, 1);

    expect(flexbuffer.getBuffer().toString()).toEqual('aabbb');
  });

  it('delete atras', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.delete(3, 6);

    expect(flexbuffer.getBuffer().toString()).toEqual('aaa');
  });

  it('delete medio', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.write('ccc');
    flexbuffer.delete(3, 6);

    expect(flexbuffer.getBuffer().toString()).toEqual('aaaccc');
  });

  it('delete adelante', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaaaaa');
    flexbuffer.write('bbb');
    flexbuffer.delete(0, 6);

    expect(flexbuffer.getBuffer().toString()).toEqual('bbb');
  });

  it('delete todo el buffer', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.delete(0, 6);

    expect(flexbuffer.getBufferReference().length).toEqual(0);
  });

  it('getLength', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');

    expect(flexbuffer.getLength()).toEqual(6);
  });

  it('getLength after reset', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');

    expect(flexbuffer.getLength()).toEqual(6);

    flexbuffer.reset();

    expect(flexbuffer.getLength()).toEqual(0);
  });

  it('deleteAndGet atras', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    const buffer: Buffer = flexbuffer.deleteAndGet(3, 6);

    expect(flexbuffer.getBuffer().toString()).toEqual('aaa');
    expect(buffer.toString()).toEqual('bbb');
  });

  it('deleteAndGet medio', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    flexbuffer.write('ccc');
    const buffer: Buffer = flexbuffer.deleteAndGet(3, 6);

    expect(flexbuffer.getBuffer().toString()).toEqual('aaaccc');
    expect(buffer.toString()).toEqual('bbb');
  });

  it('deleteAndGet adelante', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaaaaa');
    flexbuffer.write('bbb');
    const buffer: Buffer = flexbuffer.deleteAndGet(0, 6);

    expect(flexbuffer.getBuffer().toString()).toEqual('bbb');
    expect(buffer.toString()).toEqual('aaaaaa');
  });

  it('deleteAndGet todo el buffer', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    const buffer: Buffer = flexbuffer.deleteAndGet(0, 6);

    expect(flexbuffer.getBufferReference().length).toEqual(0);
    expect(buffer.toString()).toEqual('aaabbb');
  });

  it('deleteAndGet un caracter', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('aaa');
    flexbuffer.write('bbb');
    const buffer: Buffer = flexbuffer.deleteAndGet(0, 1);

    expect(flexbuffer.getBuffer().toString()).toEqual('aabbb');
    expect(buffer.toString()).toEqual('a');
  });

  it('write string with \\n', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('Sab0tcj0lM+00000109&tms=1348070338843&tmsjson=2012-09-19T15:58:58.843Z&sid=bbbbbbbbbbbb&message=lelelele&consumer=0&consumidor=0\n');

    expect(flexbuffer.getBufferReference().length).toEqual(129);
    expect(flexbuffer.getBufferReference().toString().length).toEqual(129);
    expect(flexbuffer.getBufferReference().toString()).toEqual('Sab0tcj0lM+00000109&tms=1348070338843&tmsjson=2012-09-19T15:58:58.843Z&sid=bbbbbbbbbbbb&message=lelelele&consumer=0&consumidor=0\n');
  });

  it('test write caracateres especiales', (): void => {
    const str: string = '\u00bd + \u00bc = \u00be';
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write(str);
    const buffer: Buffer = Buffer.from(str);

    expect(flexbuffer.getBuffer().length).toEqual(buffer.length);
  });

  it('write buffer con caracteres especiales', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    const buffer: Buffer = Buffer.from('\u00bd + \u00bc = \u00be');
    flexbuffer.write(buffer);

    expect(flexbuffer.getBuffer().length).toEqual(buffer.length);
  });

  it('create buffer with initial length', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer(50);

    expect(flexbuffer.getBufferLength()).toEqual(50);
  });

  it('exception con start y end erroneos', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('123456789');

    expect(() => flexbuffer.deleteAndGet(0, 10)).toThrowError();
  });

  it('exception con start negativo', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('123456789');

    expect(() => flexbuffer.deleteAndGet(-1, 10)).toThrowError();
  });

  it('exception con end negativo', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('123456789');

    expect(() => flexbuffer.deleteAndGet(0, -1)).toThrowError();
  });

  it('exception con start y end erroneos', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('123456789');

    expect(() => flexbuffer.deleteAndGet(0, 10)).toThrowError();
  });

  it('exception start > end', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('123456789');

    expect(() => flexbuffer.deleteAndGet(9, 8)).toThrowError();
  });

  it('exception con start muy grande', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('123456789');

    expect(() => flexbuffer.deleteAndGet(10, 11)).toThrowError();
  });

  it('no errores con start and end validos', (): void => {
    const flexbuffer: FlexBuffer = new FlexBuffer();
    flexbuffer.write('123456789');

    expect(() => flexbuffer.deleteAndGet(0, 9)).not.toThrowError();
  });

});
