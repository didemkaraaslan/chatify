import { CREATE_CHANNEL } from "./types";

export const createChannel = (channel) => {
  return {
    type: CREATE_CHANNEL,
    payload: channel,
  };
};
