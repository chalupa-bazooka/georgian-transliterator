import { nanoid } from "nanoid"
import { useState } from "react"
import { Link } from "react-router-dom"

import { MdLightbulb, MdLightbulbOutline } from "react-icons/md";

import transliterate from "../utilities/transliterate"

import InputWindow from "../components/InputWindow"
import OutputWindow from "../components/OutputWindow"

{/*
TO DO'S:
– I. ALTERNATIVE OPTIONS
- I.1. Add on-hover info for highlighted letters
- I.2. Can we make that on-hover interactive so that we could change letters via it?
- I.3. Add description of the issue with letter options as a separate page (Knowledge)
- I.4. Add link to it to the header
.
– II. RUSSIAN LANGUAGE SUPPORT
- II.1. Add a togler that would change Eng text to Russian
- II.2. Add the Russian version of most texts
.
- III. DESKTOP LAYOUT
- III.1. See what is the most common desktop layout and work on designing it
.
– IV. OPTIMIZING FOR OTHER VIEWPORTS
– IV.1. See what other viewports are popular and optimize both layouts for them
.
- - THIS IS WHERE I CAN SEND IT LIVE: see what free options there are (Netlify?) - -
.
– V. TRANSLATOR
– V.1. Can we use an API to get translation from Google Translate? Do it.
- V.2. If 1 is true, can we add translator as a separate page? Do it.
- V.3. If 2 is true, can we add translator to the same page? Do it.
- V.4. If 3 is true, can we rearrange our layout to make it all work well? Do it.
*/}


export default function Transliterator() {

    const [currentInput, setCurrentInput] = useState("")
    function handleChange(event) {
        setCurrentInput(event.target.value)
        setLatestOutput(transliterate(event.target.value))
    }

    const [latestOutput, setLatestOutput] = useState("")

    function clearCurrentInput() {
        setCurrentInput("")
        setLatestOutput("")
    }

    function mapOutput() {
        const triggerLetters = ["თ", "ყ", "პ", "ჰ", "კ", "ც", "ჩ"]
        if (alternativeOptionsOn) {
            return latestOutput.map(ch => {
                if (triggerLetters.includes(ch)) {
                    return <span className="highlighterLetter" key={nanoid()}>{ch}</span>
                }
                return <span key={nanoid()}>{ch}</span>
            })
        } else {
            return latestOutput.join("")
        }
    }

    const [alternativeOptionsOn, setAlternativeOptionsOn] = useState(false)

    return (
        <div>
            <InputWindow
                value={currentInput}
                onChange={handleChange}
                clearCurrentInput={clearCurrentInput}
            />

            <OutputWindow
                value={latestOutput}
                mapOutput={mapOutput}
            />

            <div className="ExtraTools">
                <p className="ExtraTools__Subtitle">Extra Tools</p>
                <div className="ExtraTools__Buttons">
                    <div className="ExtraTools__AlternativeOptionsBox">
                        <button
                            className={`ExtraTools__Button ${alternativeOptionsOn ? "ExtraTools__Button--On" : ""}`}
                            onClick={() => setAlternativeOptionsOn(prevState => !prevState)}
                        >
                            <div>
                                {alternativeOptionsOn
                                    ? <MdLightbulb id="LightBulb--On" />
                                    : <MdLightbulbOutline />
                                }
                            </div>
                            <p>
                                {alternativeOptionsOn ? "Hide" : "Show"} alternative options for letters
                            </p>
                        </button>
                        <div className="ExtraTools__Info">
                            Hover over highlighted buttons to see how else they can be transliterated.
                            Learn more about why it's important&nbsp;
                            <Link
                                to="/knowledge"
                                className="ExtraTools__Info--Link"
                            >
                                here
                            </Link>
                            .
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}