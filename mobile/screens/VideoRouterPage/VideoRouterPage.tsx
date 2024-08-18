import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import RoomPage from '../RoomPage';
import CallerPage from '../CallerPage';
import JoinerPage from '../JoinerPage';
import TempScreen from '../TempScreen';
import {RoomPageSchema, RoomPageInfo} from '../../schema/RoomPageSchema';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const VideoRouterPage = () => {
  const {control, handleSubmit, reset} = useForm<RoomPageInfo>({
    resolver: zodResolver(RoomPageSchema),
  });
  const screens = {
    ROOM: 'JOIN_ROOM',
    CALL: 'CALL',
    JOIN: 'JOIN',
    TEMP: 'TEMP',
  };

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState('');

  let content;
  switch (screen) {
    case screens.ROOM:
      content = (
        <RoomPage
          control={control}
          handleSubmit={handleSubmit}
          roomId={roomId}
          setRoomId={setRoomId}
          screens={screens}
          setScreen={setScreen}
        />
      );
      break;

    case screens.CALL:
      content = (
        <CallerPage roomId={roomId} screens={screens} setScreen={setScreen} />
      );
      break;

    case screens.JOIN:
      content = (
        <JoinerPage roomId={roomId} screens={screens} setScreen={setScreen} />
      );
      break;

    case screens.TEMP:
      content = <TempScreen />;
      break;

    default:
      content = <Text>Wrong Screen</Text>;
  }
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      {content}
    </SafeAreaView>
  );
};

export default VideoRouterPage;
