import { mount } from '@vue/test-utils';

import About from '@/views/About';

describe('About.vue', () => {
  test('renders inner text', () => {
    const wrapper = mount(About, {
      shallow: true,
    });

    expect(wrapper.text())
      .toContain('about');
  });
});
