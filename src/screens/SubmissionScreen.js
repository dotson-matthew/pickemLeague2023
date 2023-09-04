import * as React from "react";

import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from "react-native";

import { SelectList } from "react-native-dropdown-select-list";

import StyleSheet69 from "../components/StyleReference";

import axios from "axios";
import { NavigationHelpersContext } from "@react-navigation/native";
const styles = StyleSheet69();

const SubmissionScreen = ({ navigation, route }) => {
  const [exit, setExit] = React.useState(false);
  if (exit) {
    navigation.pop();
  }
  const { username } = route.params;
  console.log(username);
  const [selectionSet, setSelectionSet] = React.useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  function getTripleSet(sel) {
    var copy = [...sel];
    copy.pop();
    return copy;
  }
  const selectionSetT = getTripleSet(selectionSet);
  const now = new Date();
  const deadline = new Date();
  deadline.setUTCDate(5);
  deadline.setUTCHours(4);
  deadline.setUTCMinutes(55);
  deadline.setUTCSeconds(59);
  const prime = new Date();
  prime.setUTCDate(11);
  prime.setUTCHours(0);
  prime.setUTCMinutes(0);
  prime.setUTCSeconds(0);

  function adjustSelectionSet(normal, selNum, selected) {
    switch (normal) {
      case true: {
        var t;
        var a = [];
        for (var q = 0; q < selectionSet.length; q++) {
          if (q == selNum) {
            if (selectionSet[q] == selectionSet[8] && selectionSet[8] != "") {
              t = true;
            }
            a.push(selected);
          } else {
            a.push(selectionSet[q]);
          }
        }
        if (t == true) {
          a[8] = "";
        }
        setSelectionSet(a);
        break;
      }
      case false: {
        var a = [];
        for (var q = 0; q < selectionSet.length; q++) {
          if (q == selNum) {
            a.push(selected);
          } else {
            a.push(selectionSet[q]);
          }
        }
        setSelectionSet(a);
        break;
      }
    }
  }
  function hasDeadlinePassed() {
    const currentTime = now.toISOString();
    const deadlineTime = deadline.toISOString();
    console.log(currentTime);
    console.log(deadlineTime);
    var earliestGame;
    for (var i = 0; i < gameData.length; i++) {
      if (i == 0) {
        earliestGame = gameData[i].deadline;
        continue;
      }
      if (earliestGame > gameData[i].deadline) {
        earliestGame = gameData[i].deadline;
      }
      console.log("Earliest Game" + earliestGame);
    }
    
      if (currentTime > earliestGame) {
        console.log("Deadline Passed");
        return (
          <View>
            <Text>
              A game has passed it's deadline. Exit this page and open the
              submission page again to start over.
            </Text>
          </View>
        );
      
    }
  }

  const [locked, setLocked] = React.useState([]);
  const [gameData, setGameData] = React.useState([]);
  const [gameData2, setGameData2] = React.useState([]);
  var gamesList = [];
  var gamesList2 = [];
  const [isLoading, setIsLoading] = React.useState([]);
  var gameListPYO = [];
  var gameListSun = [];
  var gameListMon = [];
  var gameListPrime = [];

  React.useEffect(() => {
    // useEffect hook
    setGameData([
      {
        away: "DET",
        awaySpread: "7.0",
        currentTime: "09/03/2023 21:08:43",
        dayOfWeek: "T",
        deadline: "2023-09-08T00:10:00.000Z",
        gameId: "1",
        home: "KC",
        homeSpread: "-7.0",
        kickoff: "2023-09-08T00:20:00.000Z",
        week: "1",
      },
      {
        away: "JAX",
        awaySpread: "-4.0",
        currentTime: "09/03/2023 21:08:43",
        dayOfWeek: "S",
        deadline: "2023-09-10T16:50:00.000Z",
        gameId: "2",
        home: "IND",
        homeSpread: "4.0",
        kickoff: "2023-09-10T17:00:00.000Z",
        week: "1",
      },
      {
        away: "GB",
        awaySpread: "2.5",
        currentTime: "09/03/2023 21:08:43",
        dayOfWeek: "S",
        deadline: "2023-09-11T00:15:00.000Z",
        gameId: "3",
        home: "CHI",
        homeSpread: "-2.5",
        kickoff: "2023-09-11T00:25:00.000Z",
        week: "1",
      },
      {
        away: "TB",
        awaySpread: "2.5",
        currentTime: "09/03/2023 21:08:43",
        dayOfWeek: "M",
        deadline: "2023-09-12T00:15:00.000Z",
        gameId: "4",
        home: "MIN",
        homeSpread: "-2.5",
        kickoff: "2023-09-12T00:25:00.000Z",
        week: "1",
      }
    ]);
    setIsLoading(false)
     setTimeout(() => {
      // simulate a delay
      axios
        .get("https://nflpickemapi.azurewebsites.net/GetUIGameModels")
        .then((response) => {
          console.log("Made API call");
          //setGameData(response.data);
          setGameData2(response.data);
          setIsLoading(false); //set loading state
        });
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Text>Loading the data</Text>
        {console.log("loading state")}
      </View>
    );
  }
  console.log("This is gameData:");
  console.log(gameData);
  console.log("This is gameData2:");
  console.log(gameData2);

  updateGamesList(gameData);

  updateGamesList2(gamesList);
  updateSegregatedGameLists(gamesList2);
  console.log("Here is gamesListPYO:");
  console.log(gameListPYO);

  console.log("Here is gamesListPrime:");
  console.log(gameListPrime);

  const deadPage = hasDeadlinePassed();
  if (deadPage != null) {
    return deadPage;
  }

  const SubmissionButton = ({
    navigation,
    selNum,
    title2,
    games,
    gamesAlreadySelected,
  }) => {
    var title = "";
    var primeTime = false;
    var sund = false;
    var mond = false;
    var triplePlay = false;
    var submitButton = false;
    var style;
    if (title2 == selectionSet[8] && title2!=""){
      style = styles.buttonLittleTriple;
    }
    else style = styles.buttonLittle;
    
    switch (selNum) {
      case 0: {
        if (title2 == "") {
          title = "PYO #1";
        } else {
          title = title2;
        }

        break;
      }
      case 1: {
        if (title2 == "") {
          title = "PYO #2";
        } else {
          title = title2;
        }
        break;
      }
      case 2: {
        if (title2 == "") {
          title = "PYO #3";
        } else {
          title = title2;
        }
        break;
      }
      case 3: {
        if (title2 == "") {
          title = "PYO #4";
        } else {
          title = title2;
        }

        break;
      }
      case 4: {
        if (title2 == "") {
          title = "PYO #5";
        } else {
          title = title2;
        }
        break;
      }
      case 5: {
        if (title2 == "") {
          title = "PYO #6";
        } else {
          title = title2;
        }
        break;
      }
      case 6: {
        sund = true;
        if (title2 == "") {
          title = "SNF";
        } else {
          title = title2;
        }
        break;
      }
      case 7: {
        mond = true;
        if (title2 == "") {
          title = "MNF";
        } else {
          title = title2;
        }
        break;
      }
      case 8: {
        triplePlay = true;
        if (title2 == "") {
          title = "Triple Play";
        } else {
          title = title2;
        }
        break;
      }
      case 9: {
        submitButton = true;
        title = "SUBMIT PICKS";
        style = styles.buttonRectangle;
      }
    }
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState("");

    var data = gamesList2;
    // Object structure of game received from API
    // game {
    //   gameId (string),
    //   Week (int),
    //   Home (string),
    //   Away (string),
    //   Kickoff (string),
    //   Deadline (string),
    // }
    //

    if (submitButton) {
      return (
        <View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      onPress={() => {
                        // here is where we connect the backend connection
                        getSubmitString(selectionSet);
                        setModalVisible(!modalVisible);

                        //setExit(true)
                      }}
                    >
                      <View style={styles.buttonRectangle}>
                        <Text style={styles.buttonText}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.buttonRectangleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <View style={style}>
                <Text style={styles.buttonText}>{title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (triplePlay) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.categoryBox2}>
                    <Text style={styles.boxText}>Triple</Text>
                  </View>
                  <View style={styles.spacer} />
                  <View style={styles.spacer} />

                  <SelectList
                    setSelected={(val) => {
                      setSelected(val)
                    }
                  }
                    data={selectionSetT}
                    save="value"
                    boxStyles={styles.categoryBox2}
                    defaultOption={selected}
                    onSelect={() => {
                      adjustSelectionSet(false, selNum, selected);
                    }}
                  />
                  <View style={styles.spacer} />
                  <View style={styles.spacer} />
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.buttonModal}>
                      <Text style={styles.buttonText}>Close</Text>
                    </View>
                  </TouchableOpacity>
                  <Text>{selected}</Text>
                </View>
              </View>
            </Modal>
            <View style={style}>
              <Text style={styles.buttonText}>{title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      if (sund == true) {
        data = gameListSun;
      } else if (mond == true) {
        data = gameListMon;
      } else {
        data = gameListPYO;
      }
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.categoryBox2}>
                  <Text style={styles.boxText}>PYO#{selNum + 1}</Text>
                </View>
                <View style={styles.spacer} />
                <View style={styles.spacer} />

                <SelectList
                  setSelected={(val) => {
                    if (val == "Delete"){
                      setSelected("")
                    }
                    
                    else{
                      setSelected(val)
                    }
                  }
                  }
                  data={data}
                  save="value"
                  boxStyles={styles.categoryBox2}
                  defaultOption={selectionSet[selNum]}
                  onSelect={() => {
                    adjustSelectionSet(true, selNum, selected);
                  }}
                />
                <View style={styles.spacer} />
                <View style={styles.spacer} />
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.buttonModal}>
                    <Text style={styles.buttonText}>Close</Text>
                  </View>
                </TouchableOpacity>
                <Text>{selected}</Text>
              </View>
            </View>
          </Modal>
          <View>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <View style={style}>
                <Text style={styles.buttonText}>{title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <View style={styles.categoryBox}>
          <Text style={styles.boxText}>Pick Set:</Text>
        </View>
        <View style={styles.categoryBoxBigger}>
          <Text style={styles.boxText2}>{JSON.stringify(selectionSet)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.categoryBoxRectangle}>
          <Text style={styles.boxText}>PYO 1-6:</Text>
        </View>
      </View>
      <View style={styles.row}>
        <SubmissionButton
          navigation={navigation}
          selNum={0}
          title2={selectionSet[0]}
        />

        <SubmissionButton
          navigation={navigation}
          selNum={1}
          title2={selectionSet[1]}
        />
        <SubmissionButton
          navigation={navigation}
          selNum={2}
          title2={selectionSet[2]}
        />
      </View>
      <View style={styles.row}>
        <SubmissionButton
          navigation={navigation}
          selNum={3}
          title2={selectionSet[3]}
        />

        <SubmissionButton
          navigation={navigation}
          selNum={4}
          title2={selectionSet[4]}
        />

        <SubmissionButton
          navigation={navigation}
          selNum={5}
          title2={selectionSet[5]}
        />
      </View>

      <View style={styles.spacer} />

      <View style={styles.row}>
        <View style={styles.categoryBox}>
          <Text style={styles.boxText}>Prime</Text>
          <Text style={styles.boxText}>Time:</Text>
        </View>

        <SubmissionButton
          navigation={navigation}
          selNum={6}
          title2={selectionSet[6]}
        />

        <SubmissionButton
          navigation={navigation}
          selNum={7}
          title2={selectionSet[7]}
        />
      </View>

      <View style={styles.spacer} />

      <View style={styles.row}>
        <View style={styles.categoryBox}>
          <Text style={styles.boxText}>Triple</Text>
          <Text style={styles.boxText}>Play:</Text>
        </View>

        <SubmissionButton
          navigation={navigation}
          selNum={8}
          title2={selectionSet[8]}
        />
      </View>
      <View style={styles.spacer} />

      <View style={styles.row}>
        <SubmissionButton navigation={navigation} selNum={9} />
      </View>

      <View>
        <Text>{JSON.stringify(selectionSet)}</Text>
      </View>
    </View>
  );
  function updateGamesList(gameData) {
    var currentTime;
    if (gameData.length > 0) {
      currentTime = gameData[0].currentTime;
    } else return;
    var gamesListTemp = [];
    var dotw;
    var k;
    var d;
    var aString;
    var hString;
    var hSym;
    var aSym;
    for (var i = 0; i < gameData.length; i++) {
      //var date = new Date(JSON.stringify(gameTemp[i].data.kickoff));
      //dotw = date.getDay(k);
      //console.log(dotw)
      //fix later

      k = gameData[i].kickoff;
      d = gameData[i].deadline;
      if (gameData[i].homeSpread !== 0) {
        if (gameData[i].homeSpread > 0) {
          hSym = "+";
          aSym = "";
        } else {
          hSym = "";
          aSym = "+";
        }
      } else aSym = hSym = "+";

      hString =
        gameData[i].home +
        " " +
        hSym +
        gameData[i].homeSpread +
        " vs " +
        gameData[i].away;
      aString =
        gameData[i].away +
        " " +
        aSym +
        gameData[i].awaySpread +
        " @ " +
        gameData[i].home;
      gamesListTemp.push({
        id: gameData[i].gameId,
        data: {
          team: gameData[i].away,
          oppo: gameData[i].home,
          spread: gameData[i].awaySpread,
          string: aString,
        },
      });
      gamesListTemp.push({
        id: gameData[i].gameId,
        data: {
          team: gameData[i].home,
          oppo: gameData[i].away,
          spread: gameData[i].homeSpread,
          string: hString,
        },
      });
    }
    gamesList = gamesListTemp;
  }
  function updateGamesList2(gamesList) {
    var currentTime;
    if (gamesList.length < 1) {
      return;
    }
    var gamesListTemp = [];
    for (var i = 0; i < gamesList.length; i++) {
      gamesListTemp.push({
        key: gamesList[i].id,
        value: gamesList[i].data.string,
        disabled:false
      });
    }

    gamesListTemp = adjustList(selectionSet, gamesListTemp);
    gamesList2 = gamesListTemp;
  }
  function updateSegregatedGameLists(list) {
    var listPYO = [];
    var listSun = [];
    var listMon = [];

    var deadTime = deadline.toISOString();
    var primeTime = prime.toISOString();
    console.log("Here is dead:");
    console.log(deadTime);
    console.log("Here is prime:");
    console.log(primeTime);

    for (var i = 0; i < list.length; i++) {
      console.log(i + "\n" + list.length)
      var pyo = false;
      var sun = false;
      var mon = false;
      if (i == list.length -1){
        pyo =true;
        sun = true;
        mon = true;
        listSun.push(list[i]);
        listMon.push(list[i]);
        listPYO.push(list[i]);
      }
      else{
        var dotw = gameData[i/2].dayOfWeek;
      
        if (dotw == "M") {
          mon = true;
        } else if (dotw == "S" && gameData[i/2].kickoff > primeTime) {
          sun = true;
        } else {
          pyo = true;
        }

      if (sun == true) {
        listSun.push(list[i]);
        i++
        listSun.push(list[i]);
      }
      if (mon == true) {
        listMon.push(list[i]);
        i++;
        listMon.push(list[i])
      }
      if (pyo == true) {
        listPYO.push(list[i]);
        i++;
        listPYO.push(list[i]);
      }
      }
      
      
    }

    gameListPYO = listPYO;
    gameListSun = listSun;
    gameListMon = listMon;
  }
  function getTeamName(pick) {
    var name = "";
    var y;
    for (var i = 0; i < pick.length; i++) {
      y = pick.charAt(i);
      if (y != " ") {
        name += y;
      } else {
        break;
      }
    }

    return name;
  }
  function getTeamName2(pick) {
    var name = "";
    var y;
    var temp;
    for (var i = pick.length; i > 0; i--) {
      y = pick.charAt(i);
      if (y != " ") {
        temp = name;
        name = y + temp;
      } else {
        break;
      }
    }
    return name;
  }
  function adjustList(sel, list) {
    var list2 = [];
    var trueInstances = 0;

    for (var i = 0; i < list.length; i++) {
      var skip = false;
      var value = list[i].value;
      var id = list[i].id;
      var status = list[i].disabled
      var team = getTeamName(value);
      var oppo = getTeamName2(value);

      for (var x = 0; x < sel.length; x++) {
        var y = sel[x];

        var team2 = getTeamName(y);

        if (team == team2) {
          skip = true;
          trueInstances++;

          break;
        } else if (oppo == team2) {
          skip = true;
          trueInstances++;

          break;
        }
      }
      if (skip == true) {
        status = true;
      }

      list2.push({value:value,gID:id,disabled:status});
    }
    list2.push({value:"Delete",gid:999,disabled:false})
    return list2;
  }

  function getSubmitString(set) {
    var pickList = [];
    var teamsFirstTwo = ["NY", "DE", "LA"];
    for (var i = 0; i < set.length; i++) {
      var teamNameCase = false;
      var pick = set[i];
      var teamName2 = pick.substr(0, 1);
      var teamBig = false;
      for (var x = 0; x < teamsFirstTwo.length; x++) {
        if (teamName2 == teamsFirstTwo[x]) {
          teamName2 = pick.substr(0, 2);
          teamBig = true;
        }
      }
      var gID;
      var home = false;
      for (var z = 0; z < gameData.length; z++) {
        var home2;
        var away2;
        var gameCorrect = false;
        if (!teamBig) {
          home2 = gameData[z].home.substr(0, 1);
        } else {
          home2 = gameData[z].home.substr(0, 2);
        }
        if (!teamBig) {
          away2 = gameData[z].away.substr(0, 1);
        } else {
          away2 = gameData[z].away.substr(0, 2);
        }

        if (home2 == teamName2) {
          home = true;
          gameCorrect = true;
        } else if (away2 == teamName2) {
          home = false;
          gameCorrect = true;
        }
        if (!gameCorrect) {
          continue;
        } else {
          var pick = {
            weekNo: gameData[z].week,
            homePicked: home,
            pickID: i + 1,
            username: username,
            gameID: gameData[z].gameId,
          };
          console.log("PickList Added: " + JSON.stringify(pick));
          pickList.push(pick);
        }
      }
    }
    return pickList;
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
};

export default SubmissionScreen;
