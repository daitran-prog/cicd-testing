import React, { FC } from 'react';

type Props = { items: string[] };

function Memoized({ items }: Props) {
    console.log("Rendering Memoized Component");
    return (
        <div> MemoizedComponent component
            {items.map((item, index) => {
                return <div key={index}>{item}</div>
            })}
        </div>
    );
}

const MemoizedComponent = React.memo(Memoized)
export default MemoizedComponent