import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Item,
  TouchableOpacity,
  Button,
} from "react-native";
import { CreateNewRecord } from "../api/networking";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-simple-toast";
import { styles } from "./StyleSheet";

function Index({ navigation }) {
  useEffect(() => {
    async function fetchCountries() {
      if (state.countries) {
        return;
      }
      var countryList = [];

      var myHeaders = new Headers();
      myHeaders.append("status", "request_key");

      var raw = "";

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      await fetch("http://192.168.0.138:8000/countries", requestOptions)
        .then((response) => response.json())
        .then((result) => (countryList = result))
        .then(() => {
          console.log("Total countries: " + countryList.length);
        })
        .then(() => {
          dispatch({ type: "UPDATE_COUNTRY_LIST", payload: countryList });
        })
        .finally(() => dispatch({ type: "STOP_LOADING" }))
        .catch((error) => console.log("error", error));
    }
    fetchCountries();
  }, []);

  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.tag} />;

  return (
    <SafeAreaView style={styles.container}>
      {state.isLoading ? (
        <View>
          <Text>Please wait</Text>
        </View>
      ) : (
        <View>
          <TextInput
            style={{ height: 40 }}
            placeholder="Write your text here"
            onChangeText={(text) => {
              if (text) dispatch({ type: "UPDATE_TEXT", payload: text });

              if (state.text) {
                for (var i = 0; i < state.countries.length; ++i) {
                  var country = state.countries[i];
                  var alreadyListed = false;
                  for (var j = 0; state.tags && j < state.tags.length; ++j) {
                    var stateCountry = state.tags[j];

                    if (
                      stateCountry.tag.toLowerCase() == country.toLowerCase()
                    ) {
                      alreadyListed = true;
                      break;
                    }
                  }
                  if (alreadyListed) continue;

                  if (
                    state.text.toLowerCase().includes(country.toLowerCase())
                  ) {
                    // console.log("Found new country: " + country + ". Updating");
                    dispatch({ type: "ADD_NEW_TAG", payload: country });
                  }
                }
              }
            }}
          />
          <FlatList
            horizontal={true}
            style={styles.ListStyle}
            data={state.tags}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate("Country List")}
          >
            <View>
              <Text style={{ color: "#ffffff" }}>Add More Countries</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cloudButtonStyle}
            onPress={async () => {
              await CreateNewRecord(state.text, state.tags)
                .then(() => Toast.show("Uploaded to cloud"))
                .catch((err) => Toast.show("Failed to upload"));
            }}
          >
            <View>
              <Text style={{ color: "#ffffff" }}>Upload to Cloud</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

/*
 *
 * Maps store data to props
 *
 */
function mapStateToProps(state) {
  return {
    text: state.text,
    isLoading: state.isLoading,
    tags: state.tags,
    countries: state.countries,
  };
}

export default Index;
