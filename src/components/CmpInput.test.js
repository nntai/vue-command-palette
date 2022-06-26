import { render, screen } from '@testing-library/vue';
import CmpInput from './CmpInput.vue';

describe('test', () => {
  it('test', () => {
    render(CmpInput);
    expect(screen.queryByText('Input Component')).toBeTruthy();
  });
});