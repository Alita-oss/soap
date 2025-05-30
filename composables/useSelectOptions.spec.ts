import { describe, it, expect } from 'vitest';
import { useSelectOptions } from '@/composables/useSelectOptions';

const TestEnum = {
    FirstOption: 'FirstOption',
    SecondOption: 'SecondOption',
    ThirdValue: 'ThirdValue',
};

describe('useSelectOptions', () => {
    const { generateSelectOptionsFromEnum } = useSelectOptions();

    it('should generate select options with formatted text by default', () => {
        const options = generateSelectOptionsFromEnum<typeof TestEnum>(TestEnum);

        expect(options).toMatchObject([
            { value: 'FirstOption', text: 'First Option' },
            { value: 'SecondOption', text: 'Second Option' },
            { value: 'ThirdValue', text: 'Third Value' },
        ]);
    });

    it('should generate select options without formatting when formatText is false', () => {
        const options = generateSelectOptionsFromEnum<typeof TestEnum>(TestEnum, false);

        expect(options).toMatchObject([
            { value: 'FirstOption', text: 'FirstOption' },
            { value: 'SecondOption', text: 'SecondOption' },
            { value: 'ThirdValue', text: 'ThirdValue' },
        ]);
    });
});
