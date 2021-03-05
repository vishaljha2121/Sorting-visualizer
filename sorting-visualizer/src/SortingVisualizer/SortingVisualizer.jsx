import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css'


const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

let WINDOW_HEIGHT = window.innerHeight;


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
                for (let i = 0; i < 340; i++) {
                        array.push(randomIntFromIntervals(25, WINDOW_HEIGHT - 30));
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
                                        barOneStyle.backgroundColor = color;
                                        barTwoStyle.backgroundColor = color;
                                }, i * 1.5);
                        } else {
                                setTimeout(() => {
                                        const [barOneIdx, newHeight] = animations[i];
                                        const barOneStyle = arrayBars[barOneIdx].style;
                                        barOneStyle.height = `${newHeight}px`;
                                }, i * 3);
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
                                        barOneStyle.backgroundColor = color;
                                        barTwoStyle.backgroundColor = color;
                                }, i * 3);
                                
                        }
                        else {
                                const [swap, barIdx, newHeight] = animations[i];
                                if (barIdx === -1) continue;

                                const barStyle = arrayBars[barIdx].style;
                                setTimeout(() => {
                                        barStyle.height = `${newHeight}px`;
                                }, i * 3);
                        }
                
                        
                }
        }
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
                                        barOneStyle.backgroundColor = color;
                                        barTwoStyle.backgroundColor = color;
                                }, i * 0.5);
                        }
                        else {
                                const [swap, barIdx, newHeight] = animations[i];
                                if (barIdx === -1) continue;
                                const barStyle = arrayBars[barIdx].style;
                                setTimeout(() => {
                                        barStyle.height = `${newHeight}px`;
                                }, i * 0.5);
                        }
                }
                

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
                        <div className = "array-container">
                                {array.map((value, idx) => (
                                        <div
                                                className = "array-bar"
                                                key = {idx}
                                                style = {{height: `${value}px`}}></div>
                                ))}
                                <div className = "buttons">
                                        <button onClick = {() => this.resetArray()}>Generate New Array</button>
                                        <button onClick = {() => this.mergeSort()}>Merge Sort</button>
                                        <button onClick = {() => this.quickSort()}>Quick Sort</button>
                                        <button onClick = {() => this.bubbleSort()}>Bubble Sort</button>
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