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
        //const animations = [];
        //let auxiliaryArray = array.slice(0);
        //quickSortHelper(array, 0, array.length - 1, animations);
        quickSortHelper(array);
        return array;
}

function quickSortHelper(
        array,
        start,
        end,
        animations,
) {
        if (start >= end) return;

        let idx = partition(array, start, end, animations);
        quickSortHelper(array, start, idx - 1, animations);
        quickSortHelper(array, idx + 1, end, animations);
}


function partition(
        array,
        left,
        right,
        animations,
) {
        var pivot = array[Math.floor((right + left) / 2)],
        i = left,
        j = right;

        while (i <= j) {
                while (array[i] < pivot) {
                        i++;
                }
                while (array[j] > pivot) {
                        j--;
                }
                if (i <= j) {
                        animations.push([i, j]);
                        swap(array, i, j);
                }
        }
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
        let animations = [];
        const trace = newTrace(nums);

        const left = (i) => 2 * i + 1;
        const right = (i) => 2 * i + 2;
        const parent = (i) => Math.floor((i-1)/2);

        const maxHeapify = (array, i, heapSize) => {
                const lefChild = left(i);
                const rightChild = right(i);

                addToTrace(trace, array, lastSorted(trace), [i, lefChild]);

                let largest = lefChild < heapSize && array[lefChild] > array[i] ? lefChild : i;

                if (rightChild < heapSize && array[rightChild] > array[largest]) {
                        largest = rightChild;
                }
                if (largest !== i) {
                        addToTrace(trace, array, lastSorted(trace), [], [i, largest]);
                        
                        animations.push([i, largest]);
                        swap(array, i, largest);

                        addToTrace(trace, array, lastSorted(trace), [], [i, largest]);

                        maxHeapify(array, largest, heapSize);
                }
        };


        const BuildMaxHeap = (array) => {
                const start = Math.floor(array.length / 2);
                const heapSize = array.length;

                for (let i = start; i >= 0; i--) {
                        maxHeapify(array, i, heapSize);
                }
                addToTrace(trace, array, lastSorted(trace), [], [], [],createRange(0, array.length));
        };

        const heapSort = (array) => {
                BuildMaxHeap(array);
                let heapSize = array.length;
                for (let i = array.length - 1; i > 0; i--) {
                        addToTrace(trace, array, lastSorted(trace), [], [0, i]);

                        animations.push([0, i]);
                        swap(array, 0, i);
                        heapSize -= 1;

                        addToTrace(trace, array, [...lastSorted(trace), i], [], [0 ,i]);
                        maxHeapify(array, 0, heapSize);

                        addToTrace(trace, array, lastSorted(trace), [], [], [], createRange(0, heapSize));
                }
                addToTrace(trace, array, [...lastSorted(trace), 0]);
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
