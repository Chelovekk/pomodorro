import { TouchableOpacityProps } from "react-native";
import { Container } from "./styles";

export default function Index(props: TouchableOpacityProps) {
    return <Container {...props}>{props.children}</Container>;
}