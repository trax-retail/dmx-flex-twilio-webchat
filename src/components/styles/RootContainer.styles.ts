import { BoxStyleProps } from "@twilio-paste/core/box";

export const outerContainerStyles: BoxStyleProps = {
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
};

export const innerContainerStyles: BoxStyleProps = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "colorBackgroundBody"
};
