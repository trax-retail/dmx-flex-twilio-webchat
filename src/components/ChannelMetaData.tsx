import {useSelector} from "react-redux";
import {Box} from "@twilio-paste/core/box";
import log from "loglevel";

import {AppState} from "../store/definitions";

interface DialogflowChipsContent {
    type: "chips";
    options: {
        mode: string;
        text: string;
    }[];
}

interface DialogflowRichContent {
    richContent: (DialogflowChipsContent)[][];
}

type ChannelMetaDataPayload = null | DialogflowRichContent;

export const ChannelMetaData = () => {

    const payload: ChannelMetaDataPayload = {
        "richContent": [
            [
                {
                    "options": [
                        {
                            "mode": "blocking",
                            "text": "Openforce Account"
                        },
                        {
                            "text": "Support Assistance",
                            "mode": "blocking"
                        },
                        {
                            "mode": "blocking",
                            "text": "Payment Issues"
                        },
                        {
                            "mode": "blocking",
                            "text": "Survey.com Policies"
                        },
                        {
                            "text": "Extensions",
                            "mode": "blocking"
                        },
                        {
                            "mode": "blocking",
                            "text": "New to the app? Getting Started"
                        },
                        {
                            "text": "App issues",
                            "mode": "blocking"
                        },
                        {
                            "text": "Chat with a Live Agent",
                            "mode": "blocking"
                        }
                    ],
                    "type": "chips"
                }
            ]
        ]
    };

    //TODO: Don't assume payload is Dialogflow or chips
    
    const chipOptions = payload.richContent[0][0].options.map(x => x.text);

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