import {useSelector} from "react-redux";
import {Box} from "@twilio-paste/core/box";
import log from "loglevel";

import {AppState} from "../store/definitions";
import {ChannelMetadata} from "@twilio/conversations";

interface DialogflowChipsContent {
    type: "chips";
    options: {
        mode: string;
        text: string;
    }[];
}


function getDialogflowChipsContent(channelMetadata: ChannelMetadata | null): DialogflowChipsContent | null {
    if (channelMetadata?.type !== "dialogflowcx") {
        return null;
    }
    
    const data: any = channelMetadata.data;
    
    if (!Array.isArray(data?.queryResult?.responseMessages)) {
        return null;
    }
    
    for (let responseMessage of data.queryResult.responseMessages) {
        if (!Array.isArray(responseMessage.payload?.richContent)) {
            continue;
        }
        
        for (let richContent of responseMessage.payload.richContent) {
            if (!Array.isArray(richContent)) {
                continue;
            }
            
            for (let candidateContent of richContent) {
                if (candidateContent.type === 'chips' && Array.isArray(candidateContent.options)) {
                    return candidateContent;
                }
            }
        }
    }
    
    return null;
}

export const ChannelMetaData = ({ channelMetadata }: { channelMetadata: ChannelMetadata | null }) => {
    const dialogflowChipsContent = getDialogflowChipsContent(channelMetadata);
    
    if (dialogflowChipsContent === null) {
        return <></>;
    }
    
    const chipOptions = dialogflowChipsContent.options.map(x => x.text);

    const { conversation } = useSelector((state: AppState) => ({
        conversation: state.chat.conversation
    }));

    const send = async (text: string) => {
        if (!conversation) {
            log.error("Failed sending message: no conversation found");
            return;
        }

        let preparedMessage = conversation.prepareMessage();

        preparedMessage = preparedMessage.setBody(text);

        await preparedMessage.build().send();
    }

    return <>
        {chipOptions.map((option, index) => <Box
            onClick={async () => send(option)}
            key={index}
            as="div"
            cursor="pointer"
            display="inline-block"
            backgroundColor="colorBackground"
            paddingY="space20"
            paddingX="space40"
            marginTop="space20"
            marginRight="space20"
            borderRadius="borderRadius30">
            {option}
        </Box>)}
    </>;
}