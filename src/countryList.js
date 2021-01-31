import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  FlatList,
  Item,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./StyleSheet";

function CountryList({ navigation }) {
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

  initialFilter = () => {
    var tempCountries = [];
    for (var i = 0; i < state.countries.length; ++i) {
      var country = state.countries[i];
      var alreadyIncluded = false;
      if (state.tags) {
        for (var j = 0; j < state.tags.length; ++j) {
          var tagCountry = state.tags[j];
          if (tagCountry.tag.toLowerCase() == country.toLowerCase()) {
            alreadyIncluded = true;
            break;
          }
        }
        if (alreadyIncluded) continue;
      }
      tempCountries.push(country);
    }
    return tempCountries;
  };

  const [filteredCountries, FilterCountries] = useState(initialFilter());
  const [inputText, setInputText] = useState("");

  const Item = ({ title }) => (
    <View style={styles.countryListItem}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item + " adding to store");
        dispatch({ type: "ADD_NEW_TAG", payload: item });

        var tempCountries = [];
        for (var i = 0; i < filteredCountries.length; ++i) {
          var country = filteredCountries[i];
          if (country.toLowerCase() == item.toLowerCase()) {
            continue;
          }
          tempCountries.push(country);
        }
        FilterCountries(tempCountries);
      }}
    >
      <View>
        <Item title={item} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.countryListContainer}>
      {state.isLoading ? (
        <View>
          <Text>Please wait</Text>
        </View>
      ) : (
        <View>
          <TextInput
            style={{ height: 40 }}
            placeholder="Country Name"
            onChangeText={(text) => {
              if (text) setInputText(text);

              if (inputText.length > 0) {
                var tempCountries = [];
                for (var i = 0; i < state.countries.length; ++i) {
                  var country = state.countries[i];
                  var alreadyIncluded = false;
                  if (state.tags) {
                    for (var j = 0; j < state.tags.length; ++j) {
                      var tagCountry = state.tags[j];
                      if (
                        tagCountry.tag.toLowerCase() == country.toLowerCase()
                      ) {
                        alreadyIncluded = true;
                        break;
                      }
                    }
                    if (alreadyIncluded) continue;
                  }
                  if (country.toLowerCase().includes(inputText.toLowerCase())) {
                    tempCountries.push(country);
                  }
                }
                FilterCountries(tempCountries);
              }
            }}
          />
          <FlatList
            data={filteredCountries}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    text: state.text,
    isLoading: state.isLoading,
    tags: state.tags,
    countries: state.countries,
  };
}

export default CountryList;
