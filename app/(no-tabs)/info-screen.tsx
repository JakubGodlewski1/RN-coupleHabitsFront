import {SafeAreaWrapperWithGradient} from "@/components/SafeAreaWrapperWithGradient";
import HabitCard from "@/components/HabitCard";
import {Habit} from "@/types";
import Text from "@/components/Text";
import {View} from "react-native";
import Button from "@/components/Button";
import {router} from "expo-router";

const habits:Habit[] = [
    {
    id:"0",
    details: {
        mine: {
          label: "Run for at least 10 minutes",
          completed: false
        },
        partner: {
            label: "Read 2 pages of a non-fiction",
            completed: false
        }
    },
    frequency: {
        type: "repeat",
        repeatOption: "daily"
    }

},
    {
        id:"1",
        details: {
            mine: {
                label: "Run for at least 10 minutes",
                completed: false
            },
            partner: {
                label: "Read 2 pages of a non-fiction",
                completed: true
            }
        },
        frequency: {
            type: "repeat",
            repeatOption: "daily"
        }

    },
    {
        id:"2",
        details: {
            mine: {
                label: "Run for at least 10 minutes",
                completed: true
            },
            partner: {
                label: "Read 2 pages of a non-fiction",
                completed: false
            }
        },
        frequency: {
            type: "repeat",
            repeatOption: "daily"
        }

    },
    {
        id:"3",
        details: {
            mine: {
                label: "Run for at least 10 minutes",
                completed: true
            },
            partner: {
                label: "Read 2 pages of a non-fiction",
                completed: true
            }
        },
        frequency: {
            type: "repeat",
            repeatOption: "daily"
        }

    },
]

export default function InfoScreen(){

    return <SafeAreaWrapperWithGradient>
        <Text type="h1" classNames={{wrapper:"text-center"}}>
            How to play?
        </Text>
        <View className="justify-between mt-10 mb-3 grow">
            {/*top*/}

                <View className=" rotate-[4deg] scale-95">
                    <Text classNames={{wrapper:"font-alSemiBold text-center text-xl"}}>Create a habit with Your partner...</Text>
                    <HabitCard  options={{noMiddleLines:true}} habit={habits[0]}/>
                </View>

            {/*middle*/}
            <View>
                <View className="scale-95 -rotate-3 translate-y-1.5">
                    <Text  classNames={{wrapper:"font-alSemiBold text-center text-xl"}}>...but only get strike and points...</Text>
                    <HabitCard options={{noMiddleLines:true}} habit={habits[1]}/>
                </View>
                <View className="scale-95 rotate-2 -translate-y-1.5 -z-10">
                    <HabitCard options={{noMiddleLines:true}} habit={habits[2]}/>
                </View>
            </View>
            {/*bottom*/}
            <View>
                <Text classNames={{wrapper:"text-center"}} type="h3">When You complete it together!</Text>
                <HabitCard options={{noMiddleLines:true}} habit={habits[3]}/>
            </View>
        </View>
        <Button size="lg" onPress={()=>router.push("/dashboard")} title="Next"/>
    </SafeAreaWrapperWithGradient>
}