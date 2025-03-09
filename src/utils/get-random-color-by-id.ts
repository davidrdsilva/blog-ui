import { DefaultMantineColor } from '@mantine/core';

export default function getRandomColor(id: string) {
    const colors: DefaultMantineColor[] = [
        'red',
        'blue',
        'green',
        'orange',
        'pink',
        'cyan',
        'lime',
        'grape',
        'violet',
        'yellow',
    ];

    // Use a simple hash function to consistently map an ID to a color
    const hashCode = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    };

    const colorIndex = hashCode(id) % colors.length;
    return colors[colorIndex];
}
