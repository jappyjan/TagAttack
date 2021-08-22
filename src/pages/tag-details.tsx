interface Props {
    id: string;
}

export function TagDetails(props: Props) {
    return <div>Tag: {props.id}</div>
}
