import { ClassID } from "../../../../models";
import React from "react";
import { ClassIcon, IconSize } from "../class-icon";
import { Box } from "@mui/material";

export interface PublicProps {
  classID: ClassID;
  icon?: boolean;
  onClick?: () => void;
  children: string;
}

type Props = PublicProps;

export const ClassText: React.FC<Props> = ({
  classID,
  icon = false,
  onClick,
  children,
}) => {
  // let { getClassByID } = useContext(ExpansionContext);

  return (
    <Box display="flex" alignItems={"center"}>
      {icon ?? (
        <Box mr={0.5}>
          <ClassIcon classID={classID} size={IconSize.Medium} />
        </Box>
      )}
      <Box
        component={"span"}
        // style={{ color: `#${getClassByID(classID).hexColor}` }}
        onClick={onClick}
      >
        {children}
      </Box>
    </Box>
  );
};
