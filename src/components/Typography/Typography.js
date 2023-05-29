import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { IconEnd, IconStart, TextWrapper } from "./elements";
const Typography = ({
  children,
  className,
  decoration,
  align,
  fontSize = "md",
  style,
  startIcon,
  endIcon,
  ...props
}) => {
  const StartIcon = () => startIcon;
  const EndIcon = () => endIcon;
  return (
    <TextWrapper>
      {startIcon ? (
        <IconStart>
          <StartIcon />
        </IconStart>
      ) : null}
      <Text
        className={className}
        fontSize={fontSize}
        align={align}
        decoration={decoration}
        style={{ ...style }}
        {...props}
      >
        {children}
      </Text>
      {endIcon ? (
        <IconEnd>
          <EndIcon />
        </IconEnd>
      ) : null}
    </TextWrapper>
  );
};

Typography.propsType = {
  children: PropTypes.element,
  fontSize: PropTypes.string,
  align: PropTypes.string,
  decoration: PropTypes.string,
  style: PropTypes.object,
  StartIcon: PropTypes.any,
  endIcon: PropTypes.element,
  className: PropTypes.string,
  props: PropTypes.any,
};

export default Typography;
