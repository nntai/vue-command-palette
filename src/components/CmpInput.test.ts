import {render, screen, fireEvent} from '@testing-library/vue'
import CmpInput from './CmpInput.vue';

describe('test', () => {
  it('test', () => {
    const cmp = render(CmpInput);
    expect(screen.queryByText('Input Component')).toBeTruthy();
  });
});
