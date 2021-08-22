import {createMemo} from 'solid-js';

export interface IconProps {
    name: string;
    rotate?: number;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    spin?: boolean;
}

export function Icon(props: IconProps) {
    const {name, rotate, flipHorizontal, flipVertical, spin} = props;

    const classDefinition = createMemo(() => {
        let definitions: string[] = [];

        definitions.push('mdi');
        definitions.push(`mdi-${name}`);

        if (rotate !== undefined) {
            definitions.push(`mdi-rotate-${rotate}`);
        }

        if (flipHorizontal) {
            definitions.push('mdi-flip-h');
        }

        if (flipVertical) {
            definitions.push('mdi-flip-v');
        }

        if (spin) {
            definitions.push('mdi-spin');
        }

        return definitions.join(' ');
    });

    return <span class={classDefinition()}/>
}
