import Text from "@/components/Text";
import {PropsWithChildren} from "react";

export default function ({children}: PropsWithChildren) {

    return <Text classNames={{text: "mt-2 mb-8"}} type="h2">{children}</Text>
}