import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import sortingAlgorithmsDescription from '../SortingDescription/sortingDescription';
import './SortingVisualizer.css'
import {
        BubbleSortDesc,
        QuickSortDesc,
        MergeSortDesc
} from '../SortingDescription/desc';
import * as button from '@material-ui/icons';


const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const SORTING_SPEED = 2;
let WINDOW_HEIGHT = window.innerHeight;
let WINDOW_WIDTH = window.innerWidth;


export default class SortingVisualizer extends React.Component {
        constructor(props) {
                super(props);

                this.state = {
                        array: [],
                };
        }

        componentDidMount() {
                this.resetArray();
        }
        resetArray() {
                const array = [];
                for (let i = 0; i < WINDOW_WIDTH / 6; i++) {
                        array.push(randomIntFromIntervals(25, WINDOW_HEIGHT - 500));
                }
                var elements = document.getElementsByClassName('array-bar');
                for (var i = 0; i < elements.length; i++) {
                        elements[i].style.backgroundImage = 'linear-gradient('+ 'yellow' + ', ' + 'red' + ')';
                }
                this.setState({array});
        }

        mergeSort() {              
                const animations = sortingAlgorithms.mergeSort(this.state.array);
                for (let i = 0; i < animations.length; i++) {
                        const arrayBars = document.getElementsByClassName('array-bar');
                        const isColorChange = i % 3 !== 2;
                        if (isColorChange) {
                                const [barOneIdx, barTwoIdx] = animations[i];
                                const barOneStyle = arrayBars[barOneIdx].style;
                                const barTwoStyle = arrayBars[barTwoIdx].style;
                                const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
                                setTimeout(() => {
                                        barOneStyle.backgroundImage = 'linear-gradient('+ 'blue' + ', ' + 'purple' + ')';
                                        barTwoStyle.backgroundImage = 'linear-gradient('+ 'blue' + ', ' + 'purple' + ')';
                                        barOneStyle.backgroundColor = color;
                                        barTwoStyle.backgroundColor = color;
                                }, i * SORTING_SPEED);
                        } else {
                                setTimeout(() => {
                                        const [barOneIdx, newHeight] = animations[i];
                                        const barOneStyle = arrayBars[barOneIdx].style;
                                        barOneStyle.height = `${newHeight}px`;
                                }, i * SORTING_SPEED);
                        }
                }
        }
        quickSort() {
                const [animations, sortedArray] = sortingAlgorithms.quickSort(this.state.array);
                for (let i = 0; i < animations.length; i++) {
                        const isColorChange = animations[i][0] == "comparision1" || animations[i][0]  == "comparision2";
                        const arrayBars = document.getElementsByClassName('array-bar');
                        if (isColorChange === true) {
                                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                                const [comparision, barOneIdx, barTwoIdx] = animations[i];
                                const barOneStyle = arrayBars[barOneIdx].style;
                                const barTwoStyle = arrayBars[barTwoIdx].style;
                                //const color = i % 2 === 0 ? 'red' : 'turquoise';
                                setTimeout(() => {
                                        barOneStyle.backgroundImage = 'linear-gradient('+ 'blue' + ', ' + 'purple' + ')';
                                        barTwoStyle.backgroundImage = 'linear-gradient('+ 'blue' + ', ' + 'purple' + ')';
                                        barOneStyle.backgroundColor = color;
                                        barTwoStyle.backgroundColor = color;
                                }, i * SORTING_SPEED);
                                
                        }
                        else {
                                const [swap, barIdx, newHeight] = animations[i];
                                if (barIdx === -1) continue;

                                const barStyle = arrayBars[barIdx].style;
                                setTimeout(() => {
                                        barStyle.height = `${newHeight}px`;
                                }, i * SORTING_SPEED);
                        }
                
                        
                }
        }
        /*
        heapSort() {
                const animations = sortingAlgorithms.HeapSort(this.state.array);
                //run(trace);
                for (let i = 0; i < animations.length; i++) {
                        const arrayBars = document.getElementsByClassName('array-bar');
                        //const isColorChange = i % 2 != 1;

                        const [barOneIdx, barTwoIdx] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        //const color = i % 2 === 0 ? 'red' : 'turquoise';
                        setTimeout(() => {
                                barOneStyle.backgroundColor = 'red';
                                barTwoStyle.backgroundColor = 'red';
                        }, i * 3);
                        setTimeout(() => {
                                const [barOneHeight, barTwoHeight] = animations[i];
                                const barOneStyle = arrayBars[barOneIdx].style;
                                const barTwoStyle = arrayBars[barTwoIdx].style;

                                barOneStyle.height = `${barTwoHeight}px`;
                                barTwoStyle.height = `${barOneHeight}px`;
                        }, i * 1.5);
                        
                }


        }
        */
        bubbleSort() {
                const [animations, sortedArray] = sortingAlgorithms.bubbleSort(this.state.array);
                for (let i = 0; i < animations.length; i++) {
                        const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
                        const arrayBars = document.getElementsByClassName('array-bar');
                        if (isColorChange === true) {
                                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                                const [comparision, barOneIdx, barTwoIdx] = animations[i];
                                const barOneStyle = arrayBars[barOneIdx].style;
                                const barTwoStyle = arrayBars[barTwoIdx].style;
                                setTimeout(() => {
                                        barOneStyle.backgroundImage = 'linear-gradient('+ 'blue' + ', ' + 'purple' + ')';
                                        barTwoStyle.backgroundImage = 'linear-gradient('+ 'blue' + ', ' + 'purple' + ')';
                                        barOneStyle.backgroundColor = color;
                                        barTwoStyle.backgroundColor = color;
                                }, i * SORTING_SPEED);
                        }
                        else {
                                const [swap, barIdx, newHeight] = animations[i];
                                if (barIdx === -1) continue;
                                const barStyle = arrayBars[barIdx].style;
                                setTimeout(() => {
                                        barStyle.height = `${newHeight}px`;
                                        //barStyle.backgroundImage = 'linear-gradient('+ 'purple' + ', ' + 'blue' + ')';
                                }, i * SORTING_SPEED);
                        }
                }
                const arrays = document.getElementById('bar');
                arrays.style.backgroundImage = 'linear-gradient('+ 'green' + ', ' + 'black' + ')';

                

        }

        testSortingAlgorithms() {
                for (let i = 0; i < 100; i++) {
                        const array = [];
                        for (let i = 0; i < randomIntFromIntervals(1, 100); i++) {
                                array.push(randomIntFromIntervals(-1000, 1000));
                        }
                        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
                        const  heapSortedArray = sortingAlgorithms.bubbleSort(array.slice());
                        //console.log(javaScriptSortedArray);
                        //console.log(heapSortedArray);
                        console.log(arraysAreEqual(javaScriptSortedArray, heapSortedArray));
                }
        }

        render() {
                const {array} = this.state;

                return (
                        <div className = "app">
                                
                        <div className = "array-container">
                                <h1>SORTING ALGORITHM VISUALIZER</h1>
                                <h1/>
                                <h1/>
                                <div className = "array">
                                {array.map((value, idx) => (
                                        <div
                                                className = "array-bar" id = 'bar'
                                                key = {idx}
                                                style = {{height: `${value}px`}}></div>
                                ))}
                                </div>
                                <h3></h3>
                                <div className = "buttons">
                                        &nbsp;
                                        <button id = "b1" onClick = {() => this.resetArray()}>Generate New Array</button>
                                        <h3></h3>
                                        <button id = "b2" onClick = {() => this.mergeSort()}>Merge Sort</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <button id = "b3" onClick = {() => this.quickSort()}>Quick Sort</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button id = "b4" onClick = {() => this.bubbleSort()}>Bubble Sort</button>
                                        &nbsp;&nbsp;&nbsp;
                                </div>
                         
                                <div className = "SortInfo">
                        <hr/>
                        <hr/>

                        <div className = "Body">
                                <aside className = "Aside">
                                        <h3>PERFORMANCE CHART</h3>
                                        <table className = "table">
                                                <tr>
                                                        <th>PERFORMANCE CASE</th>
                                                        <th>MERGE SORT</th>
                                                        <th>QUICK SORT</th>
                                                        <th>BUBBLE SORT</th>
                                                </tr>
                                                <tr>
                                                        <td>WORST CASE</td>
                                                        <td><span>O(<em>n</em>log<em>n</em>)</span></td>
                                                        <td><span>O(<em>n</em><sup>2</sup>)</span></td>
                                                        <td><span>O(n<sup>2</sup>)</span></td>
                                                </tr>
                                                <tr>
                                                        <td>AVERAGE CASE</td>
                                                        <td><span>O(<em>n</em>log<em>n</em>)</span></td>
                                                        <td><span>O(<em>n</em>log<em>n</em>)</span></td>
                                                        <td><span>O(n<sup>2</sup>)</span></td>
                                                </tr>
                                                <tr>
                                                        <td>BEST CASE</td>
                                                        <td><span>O(<em>n</em>log<em>n</em>)</span></td>
                                                        <td><span>O(<em>n</em>log<em>n</em>)</span></td>
                                                        <td><span>O(n)</span></td>
                                                </tr>
                                        </table>


                                </aside>
                                
                        </div>
                                </div>
                                <footer>
                        <p>Designed and developed by Vishal Jha</p>
                        </footer>
                        </div>
                        </div>
                );
        }
}
function randomIntFromIntervals(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
        if (arrayOne.length !== arrayTwo.length) return false;
        for (let i = 0; i < arrayOne.length; i++) {
                if (arrayOne[i] !== arrayTwo[i]) {
                        return false;
                }
        }
        return true;
}