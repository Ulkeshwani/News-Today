import React from 'react';
import {Alert} from 'react-native';
import {
  Card,
  Subheading,
  Avatar,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const LeftContent = (props) => (
  <Avatar.Icon
    {...props}
    icon="newspaper"
    style={{backgroundColor: 'white'}}
    color="black"
  />
);

const NewsCard = ({NewsTitle, NewsImg, content, name}) => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const ShowDetails = () => (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.ScrollArea>
        <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
          <Text>This is a scrollable area</Text>
        </ScrollView>
      </Dialog.ScrollArea>
    </Dialog>
  );

  return (
    <Card style={{marginBottom: 20}} onPress={() => ShowDetails}>
      <Card.Title
        style={{padding: 10}}
        title={`${NewsTitle}`}
        subtitle={`Source : ${name}`}
        left={LeftContent}
      />
      <Card.Cover source={{uri: `${NewsImg}`}} />
      <Card.Content style={{padding: 10}}>
        <Subheading> {content}</Subheading>
      </Card.Content>
    </Card>
  );
};

export default NewsCard;
