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
        const animations = [];
        //let auxiliaryArray = array.slice(0);
        //quickSortHelper(array, 0, array.length - 1, animations);
        quickSortRecursive(array);
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


function swap (
        array,
        left,
        right,
) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
}