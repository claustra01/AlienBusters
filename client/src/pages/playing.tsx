import React from 'react';

import CustomHead from '../components/customhead'

export default function App() {

    const [screenWidth, screenHeight] = useWindowSize();
    const [clientX, clientY] = [useMousePosition()[0]/screenWidth, useMousePosition()[1]/screenHeight];

    return (
        
        <p>
            <CustomHead/>
            {`${screenWidth} x ${screenHeight}`}
            <br/>
            {`${clientX} x ${clientY}`}
        </p>
    );

}

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