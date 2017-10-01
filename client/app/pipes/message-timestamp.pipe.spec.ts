import { MessageTimestampPipe } from './message-timestamp.pipe';

describe('MessageTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new MessageTimestampPipe();
    expect(pipe).toBeTruthy();
  });
});
