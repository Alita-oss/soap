import { describe, it, expect, vi } from 'vitest';
import { useDate } from './useDate';

describe('useDate composable', () => {
    it('formats Date to locale string', () => {
        const { dateToLocaleString } = useDate();
        const testDate = new Date('2025-01-01T12:34:56Z');
        
        const formatted = dateToLocaleString(testDate);

        expect(typeof formatted).toBe('string');
        expect(formatted.length).toBeGreaterThan(0);
    });

    it('formats Date to mocked locale string', () => {
        const { dateToLocaleString } = useDate();
        const testDate = new Date('2025-01-01T12:34:56Z');

        vi.spyOn(testDate, 'toLocaleString').mockReturnValue('mocked-date');

        const formatted = dateToLocaleString(testDate);
        expect(formatted).toBe('mocked-date');
    });
});
