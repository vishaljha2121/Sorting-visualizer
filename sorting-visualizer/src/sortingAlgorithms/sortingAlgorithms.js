import {
        newTrace,
        addToTrace,
        lastSorted,
        createRange,
        createKey

} from './helpers';

//Animation algorithm for merge sort
export function mergeSort(array) {
        const animations = [];
        if (array.length <= 1) return array;
        const auxiliaryArray = array.slice();
        mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
        return animations;
}

function mergeSortHelper(
        mainArray,
        startIdx,
        endIdx,
        auxiliaryArray,
        animations,
) {
        if (startIdx === endIdx) return;
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
        mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
        doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
        mainArray,
        startIdx,
        middleIdx,
        endIdx,
        auxiliaryArray,
        animations,
) {
        let k = startIdx;
        let i = startIdx;
        let j = middleIdx + 1;
        while (i <= middleIdx && j <= endIdx) {
                animations.push([i, j]);
                animations.push([i, j]);
                if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                        animations.push([k, auxiliaryArray[i]]);
                        mainArray[k++] = auxiliaryArray[i++];
                } else {
                        animations.push([k, auxiliaryArray[j]]);
                        mainArray[k++] = auxiliaryArray[j++];
                }
        }
        while (i <= middleIdx) {
                animations.push([i, i]);
                animations.push([i, i]);
                animations.push([k, auxiliaryArray[i]]);
                mainArray[k++] = auxiliaryArray[i++];
        }
        while (j <= endIdx) {
                animations.push([j, j]);
                animations.push([j, j]);
                animations.push([k, auxiliaryArray[j]]);
                mainArray[k++] = auxiliaryArray[j++];
        }
}
//Animation algorithm for quick sort
export function quickSort(array) {
        let animations = [];
        let auxiliaryArray = array.slice();
        quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);

        return [animations, array];
}

function quickSortHelper(
        auxillaryArray,
        start,
        end,
        animations,
) {
        let pivotIdx;
        if (start < end) {
                pivotIdx = partition(auxillaryArray, start, end, animations);
                quickSortHelper(auxillaryArray, start, pivotIdx - 1, animations);
                quickSortHelper(auxillaryArray, pivotIdx + 1, end, animations);
        }
}


function partition(
        array,
        start,
        end,
        animations,
) {
        let pivotIdx = randomIntFromIntervals(start, end);

        animations.push(["comparision1", pivotIdx, end]);
        animations.push(["swap", pivotIdx, array[end]]);
        animations.push(["swap", end, array[pivotIdx]]);
        animations.push(["comparision2", pivotIdx, end]);
        swap(array, pivotIdx, end);

        let lessTailIdx = start;

        for (let i = start; i < end; ++i) {
                animations.push(["comparision1", i, end]);
                animations.push(["comparision2", i, end]);
                if (array[i] <= array[end]) {
                        animations.push(["comparision1", i, lessTailIdx]);
                        animations.push(["swap", i, array[lessTailIdx]]);
                        animations.push(["swap", lessTailIdx, array[i]]);
                        animations.push(["comparision2", i, lessTailIdx]);
                        swap(array, i, lessTailIdx);
                        lessTailIdx++;
                }
        }
        animations.push(["comparision1", lessTailIdx, end]);
        animations.push(["swap", end, array[lessTailIdx]]);
        animations.push(["swap", lessTailIdx, array[end]]);
        animations.push(["comparision2", lessTailIdx, end]);

        swap(array, lessTailIdx, end);
        return lessTailIdx;
        
}

function randomIntFromIntervals(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

//Not useful
/*
function quickSortRecursive (array) {
        if (array.length <= 1) return array;
        else {
                var leftArr = [],
                rightArr = [],
                newArr = [];

                var pivot = array.pop();
                var length = array.length;

                for (var i = 0; i < length; i++) {
                        if (array[i] <= pivot) {
                                leftArr.push(array[i]);
                        } else {
                                rightArr.push(array[i]);
                        }
                }
                return newArr.concat(quickSortRecursive(leftArr), pivot, quickSortRecursive(rightArr));
        }
}
*/

function swap (
        array,
        left,
        right,
) {
        const temp = array[left];
        array[left] = array[right];
        array[right] = temp;
}

//HEAP SORT FUNCTION
export function HeapSort(nums) {
        const animations = [];
        //const trace = newTrace(nums);

        const left = (i) => 2 * i + 1;
        const right = (i) => 2 * i + 2;
        const parent = (i) => Math.floor((i-1)/2);

        const maxHeapify = (array, i, heapSize) => {
                const lefChild = left(i);
                const rightChild = right(i);
                
                //Visualize : compare
                //addToTrace(trace, array, lastSorted(trace), [i, lefChild]);

                let largest = lefChild < heapSize && array[lefChild] > array[i] ? lefChild : i;
                
                //Visualize : compare
                //addToTrace(trace, array, lastSorted(trace), [largest, rightChild]);
                if (rightChild < heapSize && array[rightChild] > array[largest]) {
                        largest = rightChild;
                }
                if (largest !== i) {
                        //Visualize : select
                        //addToTrace(trace, array, lastSorted(trace), [], [i, largest]);
                        
                        animations.push([i, largest]);
                        swap(array, i, largest);
                        
                        //Visualize : swap
                        //addToTrace(trace, array, lastSorted(trace), [], [i, largest]);

                        maxHeapify(array, largest, heapSize);
                }
        };


        const BuildMaxHeap = (array) => {
                const start = Math.floor(array.length / 2);
                const heapSize = array.length;

                for (let i = start; i >= 0; i--) {
                        maxHeapify(array, i, heapSize);
                }
                //Visualize : mark heap built
                //addToTrace(trace, array, lastSorted(trace), [], [], [],createRange(0, array.length));
        };

        const heapSort = (array) => {
                //Building a maxHeap
                BuildMaxHeap(array);
                let heapSize = array.length;

                for (let i = array.length - 1; i > 0; i--) {
                        //Visualize : select max
                        //addToTrace(trace, array, lastSorted(trace), [], [0, i]);
                        
                        //Node removed
                        animations.push([0, i]);
                        swap(array, 0, i);
                        heapSize -= 1;

                        //Visualize : swap
                        //addToTrace(trace, array, [...lastSorted(trace), i], [], [0 ,i]);
                        maxHeapify(array, 0, heapSize);

                        //Visualize : heap created
                        //addToTrace(trace, array, lastSorted(trace), [], [], [], createRange(0, heapSize));
                }
                //addToTrace(trace, array, [...lastSorted(trace), 0]);
        };
        //Final execution of heapSort
        heapSort(nums);
        return animations;
};

export const HeapSortKey = createKey(
        'Comparing',
        'Swapping',
        null,
        'Heap Built'
);


//Bubble Sort 
export function bubbleSort(array) {
        const animations = [];
        let auxillaryArray = array.slice();
        bubbleSortHelper(auxillaryArray, animations);
        return [animations, array];
}

function bubbleSortHelper(
        auxillaryArray,
        animations,
) {
        const N = auxillaryArray.length;
        let iters = N - 1;
        while (iters > 0) {
                let swapped = false;
                for (let i = 0; i < iters; ++i) {
                        animations.push(["comparision1", i, i+1]);
                        animations.push(["comparision2", i, i+1]);
                        if (auxillaryArray[i] > auxillaryArray[i+1]) {
                                swapped = true;
                                animations.push(["swap", i, auxillaryArray[i + 1]]);
                                animations.push(["swap", i + 1, auxillaryArray[i]]);
                                swap(auxillaryArray, i, i + 1);
                        }
                }
                if (swapped == false) break;
                iters--;
        }
}