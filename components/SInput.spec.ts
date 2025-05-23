import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SInput from './SInput.vue';

describe('SInput.vue', () => {
    it('renders default input type as text', () => {
        const wrapper = mount(SInput);
        const input = wrapper.find('input');
        expect(input.attributes('type')).toBe('text');
    });

    it('applies inputType prop correctly', () => {
        const wrapper = mount(SInput, {
            props: {
                inputType: 'email',
            },
        });
        const input = wrapper.find('input');
        expect(input.attributes('type')).toBe('email');
    });

    it('does not render error image when error is false', () => {
        const wrapper = mount(SInput, {
            props: {
                error: false,
            },
        });
        expect(wrapper.find('img').exists()).toBe(false);
    });

    it('renders error image when error is true', () => {
        const wrapper = mount(SInput, {
            props: {
                error: true,
            },
        });
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('alt')).toBe('error');
    });

    it('applies error class when error is true', () => {
        const wrapper = mount(SInput, {
            props: {
                error: true,
            },
        });
        expect(wrapper.classes()).toContain('s-input--error');
    });

    it('does not apply error class when error is false', () => {
        const wrapper = mount(SInput);
        expect(wrapper.classes()).not.toContain('s-input--error');
    });

    it('renders slot content for label', () => {
        const wrapper = mount(SInput, {
            slots: {
                label: '<span>Label Text</span>',
            },
        });
        expect(wrapper.find('.s-input__label').text()).toBe('Label Text');
    });

    it('renders slot content for message', () => {
        const wrapper = mount(SInput, {
            slots: {
                message: '<span>Message Text</span>',
            },
        });
        expect(wrapper.find('.s-input__message').text()).toBe('Message Text');
    });
});
