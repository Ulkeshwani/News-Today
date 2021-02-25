import React, {Component} from 'react';
import {ActivityIndicator, Colors, FAB, Portal} from 'react-native-paper';
import {View, StyleSheet, RefreshControl} from 'react-native';

import GetNews from '../../E2E/News.api';
import {KEY} from '../../E2E/NewsAPIKEY';
import {ScrollView} from 'react-native-gesture-handler';
import NewsCard from '../../components/News Cards/News.component';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      News: [],
      Topic: 'top-headlines',
      category: 'business',
      countryCode: 'us',
      loading: false,
      isDone: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      GetNews.get(
        `${this.state.Topic}?country=${this.state.countryCode}&category=${this.state.category}&apiKey=${KEY}`,
      )
        .then((response) => {
          this.setState({statusCode: response.status, News: response.data});
        })
        .then((json) => {
          setTimeout(() => {
            this.setState({isDone: true});
          }, 1000);
        })
        .catch((error) => {
          console.log('error :' + error);
        });
    }, 1200);
  }

  onRefresh = () => {
    this.setState({loading: true});
    wait(2000).then(() => this.setState({loading: false}));
  };

  onChangeSearch = (query) => this.setState({searchField: query});

  openMenu = () => this.setState({visible: true});

  closeMenu = () => this.setState({visible: false});

  handleQueryChange = (query) => this.setState({searchField: query});

  render() {
    const {isDone, News, searchField} = this.state;

    const HeaderIcon = () => {
      const {visible} = this.state;
      return (
        <Portal>
          <FAB.Group
            open={visible}
            icon={visible ? 'calendar-today' : 'account'}
            actions={[
              {
                icon: 'star',
                label: 'Star',
                onPress: () => console.log('Pressed star'),
              },
              {
                icon: 'email',
                label: 'Email',
                onPress: () => console.log('Pressed email'),
              },
              {
                icon: 'bell',
                label: 'Remind',
                onPress: () => console.log('Pressed notifications'),
                small: true,
              },
            ]}
            style={{bottom: '7.5%'}}
            fabStyle={{backgroundColor: 'dodgerblue'}}
            color="white"
            onStateChange={() => this.setState({visible: !this.state.visible})}
            onPress={() => {
              if (visible) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      );
    };

    return (
      <View style={styles.Container}>
        {!isDone ? (
          <ActivityIndicator
            style={{height: '100%'}}
            size={50}
            animating={true}
            color={Colors.blue800}
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this.onChangeSearch}
              />
            }>
            {News.articles.map(
              ({title, urlToImage, url, content, source: {name}}, index) => (
                <NewsCard
                  NewsTitle={title}
                  NewsImg={urlToImage}
                  key={index}
                  content={content}
                  name={name}
                  NewsUrl={url}
                  navigation={this.props.navigation}
                />
              ),
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    padding: 10,
  },
});

export default Home;
