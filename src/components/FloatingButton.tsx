import {Icon, IconProps} from './Icon';
import {createMemo, JSX} from 'solid-js';
import {Link} from '@rturnq/solid-router';

interface Props {
    iconBefore?: IconProps;
    children?: JSX.Element;
    iconAfter?: IconProps;
    background?: string;
    color?: string;
    ring?: string;
    to?: string;
}

export function FloatingButton(props: Props) {
    const {
        iconBefore,
        children,
        iconAfter,
        background,
        color,
        ring,
        to,
    } = props;

    const className = createMemo(() => {
        const classes = [
            `bg-${background ?? 'green-500'}`,
            `text-${color ?? 'black'}`,
            `p-2`,
            `rounded-full`,
            `h-18 w-18`,
            `text-2xl`,
            `ring-4`,
            `ring-${ring ?? 'green-200'}`,
            `shadow-2xl`,
            `focus:outline-none`,
            `focus:ring-orange-400`,
        ];

        return classes.join(' ');
    });

    const Content = () => <>
        {iconBefore && <Icon {...iconBefore} />}
        {children}
        {iconAfter && <Icon  {...iconAfter} />}
    </>

    const Button = () => (
        <button class={className()}>
            <Content/>
        </button>
    )

    if (to) {
        return <Link href={to}>
            <Button/>
        </Link>
    }

    return (
        <Button />
    )
}
