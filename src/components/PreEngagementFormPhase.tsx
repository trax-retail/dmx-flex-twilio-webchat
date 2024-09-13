import { Label } from "@twilio-paste/core/label";
import { Box } from "@twilio-paste/core/box";
import { TextArea } from "@twilio-paste/core/textarea";
import { FormEvent } from "react";
import { Button } from "@twilio-paste/core/button";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@twilio-paste/core/text";

import { sessionDataHandler } from "../sessionDataHandler";
import { addNotification, changeEngagementPhase, updatePreEngagementData } from "../store/actions/genericActions";
import { initSession } from "../store/actions/initActions";
import { AppState, EngagementPhase } from "../store/definitions";
import { Header } from "./Header";
import { notifications } from "../notifications";
import { NotificationBar } from "./NotificationBar";
import { fieldStyles, titleStyles, formStyles } from "./styles/PreEngagementFormPhase.styles";

export const PreEngagementFormPhase = () => {
    const { id, name, email, query } = useSelector((state: AppState) => state.session.preEngagementData) || {};
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(changeEngagementPhase({ phase: EngagementPhase.Loading }));
        try {
            const data = await sessionDataHandler.fetchAndStoreNewSession({
                formData: {
                    id,
                    friendlyName: name,
                    email,
                    query
                }
            });
            dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
        } catch (err) {
            dispatch(addNotification(notifications.failedToInitSessionNotification((err as Error).message)));
            dispatch(changeEngagementPhase({ phase: EngagementPhase.PreEngagementForm }));
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <>
            <Header />
            <NotificationBar />
            <Box as="form" data-test="pre-engagement-chat-form" onSubmit={handleSubmit} {...formStyles}>
                <Text {...titleStyles} as="h3">
                    Hi {name}!
                </Text>

                <Box {...fieldStyles}>
                    <Label htmlFor="query">What can I assist you with today?</Label>
                    <TextArea
                        placeholder="Ask a question"
                        name="query"
                        data-test="pre-engagement-chat-form-query-textarea"
                        value={query}
                        onChange={(e) => dispatch(updatePreEngagementData({ query: e.target.value }))}
                        onKeyPress={handleKeyPress}
                        required
                    />
                </Box>

                <Button variant="primary" type="submit" data-test="pre-engagement-start-chat-button">
                    Start chat
                </Button>
            </Box>
        </>
    );
};
