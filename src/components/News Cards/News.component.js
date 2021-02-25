import React from 'react';
import {Alert} from 'react-native';
import {Card, Subheading, Avatar, Button, Paragraph} from 'react-native-paper';
import NewsWebview from '../NewsWebview.component';

export default NewsCard = ({
  NewsTitle,
  NewsImg,
  content,
  name,
  NewsUrl,
  navigation,
}) => {
  return (
    <Card
      style={{marginBottom: 20}}
      onPress={() =>
        navigation.navigate('Article', {
          NewsUrl: NewsUrl === undefined ? `https://www.google.com` : NewsUrl,
          title: name,
        })
      }>
      <Card.Cover source={{uri: `${NewsImg}`}} />
      <Card.Title
        style={{padding: 10}}
        title={`${NewsTitle}`}
        subtitle={`Source : ${name}`}
      />
      <Card.Content style={{padding: 10}}>
        <Paragraph> {content}</Paragraph>
      </Card.Content>
      <Card.Actions></Card.Actions>
    </Card>
  );
};
