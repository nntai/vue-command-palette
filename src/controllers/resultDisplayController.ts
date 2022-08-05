import { ref, watch, Ref, onMounted } from "vue";
import Command from "../models/command";
export default function resultDisplayController() {
    // const commandTest: Ref<Command[]> = ref([]);
    // const regex = new RegExp(searchPhrase);
    // commandTest.value = commandFilteredLists;
    //     for (let i: number = 0; i < commandTest.value.length; ++i) {
    //         if (regex.test(commandTest.value[i].getCommandName())){
    //             commandTest.value[i].setCommandName('<span style="color:blue">' + commandTest.value[i].getCommandName()+'</span>');
    //         }
    //     }
    // console.log(commandTest.value.length);
    function returnTestCommand(
        commandFilteredLists: Command[],
        searchPhrase: string
    ) {
        let returnTestedCommand: Command[] = [];
        const regex = new RegExp(searchPhrase);
        console.log(commandFilteredLists.length);
        for (let i: number = 0; i < commandFilteredLists.length; ++i) {
            const command = new Command("", "", () => { });
            let str: string = commandFilteredLists[i].getCommandName();
            let arr: string[] = str.split(" ");
            let newString = "";
            console.log(arr);
            for(let j: number = 0; j<arr.length;++j){
                if(regex.test(arr[j])){
                newString +='<span style="color:blue">' + arr[j] + "</span> "
            }else{  
                newString += arr[j] + " ";
            }
            }
            command.setCommandName(
                newString
            );
            command.setCommandKey(commandFilteredLists[i].getCommandKey());
            command.setCommandAction(commandFilteredLists[i].getCommandAction);
            returnTestedCommand.push(command);
            console.log(returnTestedCommand[i].getCommandName());
        }
        console.log(returnTestedCommand);
        return returnTestedCommand;
    }
    return { returnTestCommand };
}
