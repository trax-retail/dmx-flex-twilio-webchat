import { Client, Conversation, Participant, Message, User, ChannelMetadata } from "@twilio/conversations";
import { GenericThemeShape } from "@twilio-paste/theme";
import { AlertVariants } from "@twilio-paste/core/alert";
import { Sid } from "twilio/lib/interfaces";

import { FileAttachmentConfig, TranscriptConfig } from "../definitions";

export enum EngagementPhase {
    PreEngagementForm = "PreEngagementForm",
    MessagingCanvas = "MessagingCanvas",
    Loading = "Loading"
}

export type ChatState = {
    conversationsClient?: Client;
    conversation?: Conversation;
    participants?: Participant[];
    users?: User[];
    messages?: Message[];
    channelMetadataMap?: {
        [key: Sid]: ChannelMetadata | null;
    };
    attachedFiles?: File[];
    conversationState?: string;
};

export type PreEngagementData = { id: string; name: string; email: string; query: string };

export type SessionState = {
    currentPhase: EngagementPhase;
    expanded: boolean;
    token?: string;
    conversationSid?: string;
    conversationsClient?: Client;
    conversation?: Conversation;
    users?: User[];
    participants?: Participant[];
    messages?: Message[];
    conversationState?: "active" | "inactive" | "closed";
    preEngagementData?: PreEngagementData;
};

export type ConfigState = {
    serverUrl?: string;
    theme?: {
        isLight?: boolean;
        overrides?: Partial<GenericThemeShape>;
    };
    fileAttachment?: FileAttachmentConfig;
    transcript?: TranscriptConfig;
};

export type Notification = {
    dismissible: boolean;
    id: string;
    onDismiss?: () => void;
    message: string;
    timeout?: number;
    type: AlertVariants;
};

export type NotificationState = Notification[];

export type AppState = {
    chat: ChatState;
    config: ConfigState;
    session: SessionState;
    notifications: NotificationState;
};
