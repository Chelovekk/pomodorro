import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Title, Text } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import Index from "../components";
import { Vibration } from 'react-native'

const INITIAL_TIME_IN_SECONDS = 1 * 60; // 25 minutes

export default function Timer() {
    const [count, setCount] = useState(INITIAL_TIME_IN_SECONDS);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (active) {
            const interval = setInterval(() => {
                setCount((state) => state - 1);
            }, 1000);

            if (count === 0) {
                Vibration.vibrate()
                setActive(false);
                setCount(INITIAL_TIME_IN_SECONDS);
            }

            return () => {
                clearInterval(interval);
            };
        }
    }, [active, count]);

    const minutes = useMemo(() => Math.floor(count / 60), [count]);
    const seconds = useMemo(() => count % 60, [count]);
    const progress = useMemo(
        () => (count * 100) / INITIAL_TIME_IN_SECONDS,
        [count]
    );
    const iconButton = useMemo(
        () => (
            <Ionicons
                name={active ? "pause-outline" : "play-outline"}
                size={24}
                color="white"
            />
        ),
        [active]
    );

    const toggleTimer = useCallback(() => {
        setActive(!active);
    }, [active]);

    return (
        <Container>
            <StatusBar style="auto" />
            <Title>Let&apos;s focus for</Title>
            <Text>${minutes}:${seconds}</Text>
            <Index onPress={toggleTimer}>{iconButton}</Index>
        </Container>
    );
}