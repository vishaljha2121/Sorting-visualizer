import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css'

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
                        array.push(randomIntFromIntervals(5, 800));
                }
                this.setState({array});
        }

        mergeSort() {
                const animations = sortingAlgorithms.mergeSort(this.state.array);
                for (let i = 0; i < animations.length; i++) {
                        const arrayBars = document.getElementsByClassName('array-bar');
                        const isColorChange = i % 3 != 2;
                        if (isColorChange) {
                                const [barOneIdx, barTwoIdx] = animations[i];
                                const barOneStyle = arrayBars[barOneIdx].style;
                                const barTwoStyle = arrayBars[barTwoIdx].style;
                                const color = i % 3 === 0 ? 'red' : 'turquoise';
                                setTimeout(() => {
                                        barOneStyle.backgroundColor = 'purple';
                                        barTwoStyle.backgroundColor = 'purple';
                                }, i * 2);
                        } else {
                                setTimeout(() => {
                                        const [barOneIdx, newHeight] = animations[i];
                                        const barOneStyle = arrayBars[barOneIdx].style;
                                        barOneStyle.height = `${newHeight}px`;
                                }, i * 2);
                        }
                }
        }
        quickSort() {

        }
        heapSort() {

        }
        bubbleSort() {

        }

        testSortingAlgorithms() {
                for (let i = 0; i < 100; i++) {
                        const array = [];
                        for (let i = 0; i < randomIntFromIntervals(1, 100); i++) {
                                array.push(randomIntFromIntervals(-1000, 1000));
                        }
                        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
                        const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());
                        console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
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
                                        <button onClick = {() => this.heapSort()}>Heap Sort</button>
                                        <button onClick = {() => this.bubbleSort()}>Bubble Sort</button>
                                        <button onClick = {() => this.testSortingAlgorithms()}>TEST ALGO</button>
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