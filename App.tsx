/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {request, PERMISSIONS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker';
// import {} from 'react-native-permissions'

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
      checkPermission();
  }, []);

  const checkPermission = async () => {
      const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      console.log('permissionStatus =====>', permissionStatus);
      if (permissionStatus === 'granted') {
          setHasPermission(true);
      } else {
          setHasPermission(false);
      }
  };

  const handlePermissionRequest = async () => {

    const options : ImageLibraryOptions = {

      mediaType : 'photo'
    }
    const result = await launchImageLibrary(options);
    console.log('result =====>', result);
      // const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      // if (permissionStatus === 'granted') {
      //     setHasPermission(true);
      // } else {
      //     Alert.alert('Permission Denied', 'Please allow access to your gallery to continue.');
      // }
  };

  const openGallery = () => {
      if (hasPermission) {
          // Code to open gallery
          // e.g., use react-native-image-picker or other library
      } else {
          handlePermissionRequest();
      }
  };
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
