import { Player } from "../../../../../../../../models/players";
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Clear, Edit } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import {
  getSpecializationIDText,
  ItemType,
  PlayerItem as DNDPlayerItem,
  SpecializationItem,
} from "../../../../../../../../models";
import { ConnectableElement, useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

interface PublicProps {
  player?: Player;
  raidIndex: number;
  selected?: boolean;
  onRemoveButtonClick?: (player: Player) => void;
  onDrop?: (player: Player, fromIndex?: number) => void;
  onNameInputSubmit?: (newPlayer: Player, oldPlayer: Player) => void;
}

export type Props = PublicProps;

export const PlayerItem: React.FC<Props> = ({
  player,
  raidIndex,
  selected = false,
  onRemoveButtonClick,
  onDrop,
  onNameInputSubmit,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(player?.name);
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: [ItemType.Specialization, ItemType.Player],
      drop: (item: SpecializationItem | DNDPlayerItem, monitor) => {
        switch (monitor.getItemType()) {
          case ItemType.Specialization:
            onDrop?.({
              id: uuidv4(),
              // @ts-ignore TODO FIX THIS
              specialization: item.specialization,
            });
            break;
          case ItemType.Player:
            // @ts-ignore TODO FIX THIS
            onDrop?.(item.player, item.fromIndex);
            break;
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [onDrop]
  );

  const [, dragRef] = useDrag(
    () => ({
      type: ItemType.Player,
      item: {
        player,
        fromIndex: raidIndex,
      },
      canDrag: () => {
        return !!player;
      },
    }),
    [player, raidIndex]
  );

  return (
    <Box
      display={"flex"}
      position={"relative"}
      height={34}
      alignItems={"center"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={(el: ConnectableElement) => {
        // This element is both a drag and drop reference! Neat!
        dragRef(el);
        dropRef(el);
      }}
      bgcolor={isOver ? "darkslategray" : selected ? "aqua" : ""}
    >
      {player && (
        <>
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();

                onNameInputSubmit?.(
                  {
                    ...player,
                    name: newName,
                  },
                  player
                );

                setIsEditing(false);
              }}
            >
              <TextField
                label={"Name"}
                type={"text"}
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
              />
            </form>
          ) : (
            <Typography>
              {player.name || getSpecializationIDText(player.specialization.id)}
            </Typography>
          )}
          {(isHovered || isEditing) && (
            <Box position={"absolute"} right={0} top={0} bottom={0}>
              <Tooltip
                title={
                  <FormattedMessage
                    id={"edit-tooltip-text"}
                    description={
                      "Tooltip button text to edit player in raid list"
                    }
                    defaultMessage={"Edit"}
                  />
                }
              >
                <IconButton
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                  size={"small"}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  <FormattedMessage
                    id={"remove-tooltip-text"}
                    description={
                      "Tooltip button text to remove player from raid list"
                    }
                    defaultMessage={"Remove"}
                  />
                }
              >
                <IconButton
                  onClick={() => onRemoveButtonClick?.(player)}
                  size={"small"}
                >
                  <Clear />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
