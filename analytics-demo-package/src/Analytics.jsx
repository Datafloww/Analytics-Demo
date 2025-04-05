import React from "react";
import { useState, useEffect } from "react";
import { an } from "../index";

const Analytics = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        an.page();
    }, []);
    const track = () => {
        setCount(count + 1);
        an.track("Button Clicked", { event: "click", name: "OK" }).then((res) =>
            console.log(res)
        );
    };
    const login = () => {
        an.identify("11", { usernme: "Taha" });
    };
    return (
        <>
            <button onClick={track}>CLick {count}</button>
            <button onClick={login}>Login</button>;
        </>
    );
};

export default Analytics;
