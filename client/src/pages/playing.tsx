import React from 'react';

export default function App() {

    const [clientX, clientY] = useMousePosition();
    const [screenWidth, screenHeight] = useWindowSize();
    const [clientXf, clientYf] = [clientX/screenWidth, clientY/screenHeight];

    return (
        <p>
            {`${clientX} x ${clientY}`}
            <br/>
            {`${screenWidth} x ${screenHeight}`}
            <br/>
            {`${clientXf} x ${clientYf}`}
        </p>
    );

}

const useMousePosition = () => {
    const [
        mousePosition,
        setMousePosition
    ] = React.useState([0, 0]);

    React.useEffect(() => {

        const updateMousePosition = (event: { clientX: any; clientY: any; }) => {
            setMousePosition([event.clientX, event.clientY]);
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
        
    }, []);

    return mousePosition;
};

const useWindowSize = (): number[] => {
    const [
        size,
        setSize
    ] = React.useState([0, 0]);

    React.useLayoutEffect(() => {

        const updateSize = (): void => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);

    }, []);

    return size;
};