import { IconButton, Tooltip } from "@mui/material";
import {
  getSpecializationIDText,
  getSpecIconURL,
  ItemType,
  Specialization,
  SpecializationItem,
} from "../../../../../../models";
import React from "react";
import { useIntl } from "react-intl";
import { useDrag } from "react-dnd";

interface PublicProps {
  spec: Specialization;
  onClick?: (spec: Specialization) => void;
}

export type Props = PublicProps;

export const ClassSpecButton: React.FC<Props> = ({ spec, onClick }) => {
  const intl = useIntl();
  const [, dragRef] = useDrag<SpecializationItem>(() => ({
    type: ItemType.Specialization,
    item: {
      specialization: spec,
    },
  }));

  return (
    <Tooltip
      title={getSpecializationIDText(spec.id)}
      placement={"top"}
      ref={dragRef}
    >
      <IconButton onClick={() => onClick?.(spec)}>
        <img
          alt={intl
            .formatMessage(
              {
                id: "icon-spec-text",
                description: "Icon text",
                defaultMessage: "Icon for {specName}",
              },
              {
                specName: getSpecializationIDText(spec.id),
              }
            )
            ?.toString()}
          src={getSpecIconURL(spec)}
          height={25}
          width={25}
        />
      </IconButton>
    </Tooltip>
  );
};
