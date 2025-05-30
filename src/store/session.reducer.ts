import { AnyAction, Reducer } from "redux";

import { EngagementPhase, SessionState } from "./definitions";
import {
    ACTION_CHANGE_ENGAGEMENT_PHASE,
    ACTION_CHANGE_EXPANDED_STATUS,
    ACTION_START_SESSION,
    ACTION_UPDATE_SESSION_DATA,
    ACTION_UPDATE_PRE_ENGAGEMENT_DATA
} from "./actions/actionTypes";

declare global {
    interface Window {
        userData: {
            id: string;
            name: string;
            email: string;
            state: string | null;
        };
        chatContext: Record<string, unknown>;
    }
}

const initialState: SessionState = {
    currentPhase: EngagementPhase.Loading,
    expanded: true,
    preEngagementData: { 
        id: window.userData.id,
        name: window.userData.name,
        email: window.userData.email,
        state: window.userData.state,
        context: window.chatContext,
        query: "",
    }
};

export const SessionReducer: Reducer<SessionState, AnyAction> = (
    state: SessionState = initialState,
    action: AnyAction
): SessionState => {
    switch (action.type) {
        case ACTION_START_SESSION: {
            return {
                ...state,
                token: action.payload.token,
                conversationSid: action.payload.conversationSid,
                currentPhase: action.payload.currentPhase
            };
        }

        case ACTION_UPDATE_SESSION_DATA: {
            return {
                ...state,
                token: action.payload.token,
                conversationSid: action.payload.conversationSid
            };
        }

        case ACTION_CHANGE_EXPANDED_STATUS: {
            return {
                ...state,
                expanded: action.payload.expanded
            };
        }

        case ACTION_CHANGE_ENGAGEMENT_PHASE: {
            return {
                ...state,
                currentPhase: action.payload.currentPhase
            };
        }

        case ACTION_UPDATE_PRE_ENGAGEMENT_DATA: {
            return {
                ...state,
                preEngagementData: {
                    ...state.preEngagementData,
                    ...action.payload.preEngagementData
                }
            };
        }

        default:
            return state;
    }
};
