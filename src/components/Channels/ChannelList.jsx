import React from "react";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChannel } from "../../store/actions/channel";
import { Menu } from "semantic-ui-react";

const ChannelList = () => {
  const dispatch = useDispatch();
  useFirebaseConnect([{ path: "channels" }]);

  const channels = useSelector((state) => state.firebase.ordered.channels);
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const setActiveChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  if (!isLoaded(channels)) {
    return "Loading channels";
  }
  return (
    <Menu.Menu>
      {channels &&
        channels.map(({ key, value: { name, description, createdBy } }) => (
          <Menu.Item
            key={key}
            name={name}
            as="a"
            icon="hashtag"
            active={currentChannel?.key === key}
            onClick={() =>
              setActiveChannel({ key, name, description, createdBy })
            }
          />
        ))}
    </Menu.Menu>
  );
};

export default ChannelList;
