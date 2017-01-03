import React from "react";
import {observer} from "mobx-react";
import {observable, action} from "mobx"
import TextField from "material-ui/TextField";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import RaisedButton from 'material-ui/RaisedButton';

import styles from "./loadApp.scss"

const MUICustomStyles = {
    textField: {
        errorStyle: {
            position: "absolute",
            bottom: "-8px"
        }
    }
}

@observer
export default class App extends React.Component {
    componentWillMount() {
        injectTapEventPlugin();
    }

    @observable mobxState = {
        textFieldValue: "",
        nestedArray: [],
        flatArray: [],
        error: ""
    }

    @action
    handleChange = event => {
        this.mobxState.textFieldValue = event.target.value
    }

    @action
    handleClick = () => {
        try {
            var nestedArray = JSON.parse(this.mobxState.textFieldValue)
            if (Array.isArray(nestedArray)) {
                this.mobxState.flatArray = this.flatAlgorithm(nestedArray, [])
                this.mobxState.nestedArray = nestedArray
                this.mobxState.error = ""
            } else {
                this.mobxState.error = "The text you entered is not an array"
            }
        } catch (error) {
            this.mobxState.error = "Invalid format"
        }
    }

    flatAlgorithm = (obj, ret) => {
        if (Array.isArray(obj)) {
            for (var key in obj) {
                this.flatAlgorithm(obj[key], ret)
            }
        } else {
            ret.push(obj)
        }

        return ret
    }

    render() {
        return (<div className={styles.container}>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <h1>Nested To Flat</h1>
                    <TextField
                        floatingLabelText="Insert array e.g. [ [ 1, 2, [ 3 ] ], 4 ]"
                        value={this.mobxState.textFieldValue}
                        onChange={this.handleChange}
                        errorText={this.mobxState.error}
                        errorStyle={MUICustomStyles.textField.errorStyle}
                        ref="textField"
                    />
                    <RaisedButton ref="button" className={styles.button} label="Flat array" primary
                                  onTouchTap={this.handleClick}/>
                    <h3>Result: </h3>
                    <p>Entry: <b ref="entry" >{JSON.stringify(this.mobxState.nestedArray)}</b></p>
                    <p>Result: <b ref="result" >{JSON.stringify(this.mobxState.flatArray)}</b></p>
                </div>
            </MuiThemeProvider>
        </div>)
    }
}
