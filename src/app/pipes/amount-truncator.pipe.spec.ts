import { AmountTruncatorPipe } from './amount-truncator.pipe';

describe('AmountTruncatorPipe', () => {
  it('create an instance', () => {
    const pipe = new AmountTruncatorPipe();
    expect(pipe).toBeTruthy();
  });
});
