import {defineConfig} from 'windicss/helpers';
import formsPlugin from 'windicss/plugin/forms';

interface MapToRangeProps {
    min: number;
    max: number;
    steps: number;
    template: (index: number) => string
}

function mapToRange(props: MapToRangeProps) {
    let items: string[] = [];
    for (let index = props.min; index <= props.max; index += props.steps) {
        items.push(props.template(index));
    }
    return items;
}

export default defineConfig({
    darkMode: 'class',
    plugins: [formsPlugin],
    attributify: true,
    safelist: [
        'bg-black bg-green-500',
        'text-gray-200 text-black',
        'ring-gray-600 ring-green-200',
        'text-2xl',
        'focus:outline-none',
        'focus:ring-orange-400',
        ...mapToRange({min: 1, max: 24, steps: 1, template: (i) => `h-${i}`}),
        ...mapToRange({min: 1, max: 24, steps: 1, template: (i) => `w-${i}`})
    ]
})
